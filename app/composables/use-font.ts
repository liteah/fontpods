function getLocalFontAccess(): LocalFontAccess | null {
	if (typeof window === 'undefined') return null
	const w = window as unknown as Partial<LocalFontAccess>
	return typeof w.queryLocalFonts === 'function' ? (w as LocalFontAccess) : null
}

const access = getLocalFontAccess()
const supported = ref(access !== null)
const permission = ref<FontPermissionState>(access ? 'prompt' : 'unsupported')

export function useFont() {
	const fontStore = useFontStore()
	const fontListStore = useFontListStore()

	const loading = computed(() => fontStore.loading)
	const error = computed(() => fontStore.error)

	const filteredFonts = computed(() => {
		const source = fontListStore.state.filterSource
		const search = fontListStore.state.search.trim().toLowerCase()

		return fontStore.regularFonts.filter((f) => {
			if (source === 'local' && f.source !== 'local') return false
			if (source === 'web' && f.source !== 'web') return false
			if (source === 'favorites' && !f.favorite) return false
			if (search) {
				const haystack = `${f.family} ${f.fullName} ${f.postscriptName}`.toLowerCase()
				if (!haystack.includes(search)) return false
			}
			return true
		})
	})

	async function checkPermission() {
		if (!access) {
			permission.value = 'unsupported'
			return
		}

		try {
			const result = await navigator.permissions.query({
				name: 'local-fonts' as PermissionName,
			})
			permission.value = result.state as FontPermissionState
		} catch {
			permission.value = 'prompt'
		}
	}

	async function requestPermission() {
		if (!access) return

		fontStore.loading = true
		fontStore.error = null

		try {
			const raw = await access.queryLocalFonts()
			permission.value = 'granted'
			fontStore.setLocalFonts(raw)
		} catch (e) {
			permission.value = 'denied'
			fontStore.error = e instanceof Error ? e.message : String(e)
		} finally {
			fontStore.loading = false
		}
	}

	async function loadFonts() {
		if (!access) {
			permission.value = 'unsupported'
			return
		}
		if (permission.value !== 'granted') {
			await requestPermission()
			return
		}

		fontStore.loading = true
		fontStore.error = null

		try {
			const raw = await access.queryLocalFonts()
			fontStore.setLocalFonts(raw)
		} catch (e) {
			fontStore.error = e instanceof Error ? e.message : String(e)
		} finally {
			fontStore.loading = false
		}
	}

	return {
		supported,
		permission,
		loading,
		error,
		fonts: computed(() => fontStore.fonts),
		filteredFonts,
		totalCount: computed(() => fontStore.totalCount),
		checkPermission,
		requestPermission,
		loadFonts,
	}
}
