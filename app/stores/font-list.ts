const defaultPreviewText = 'The quick brown fox jumps over the lazy dog.'
const defaultFontSize = 24

export const useFontListStore = defineStore(
	'fontList',
	() => {
		const state = reactive({
			search: '',
			previewText: defaultPreviewText,
			fontSize: defaultFontSize,
			layout: 'grid' as FontLayout,
			filterSource: 'all' as FontFilterSource,
		})

		function resetPreview() {
			state.previewText = defaultPreviewText
			state.fontSize = defaultFontSize
		}

		function resetFontSize() {
			state.fontSize = defaultFontSize
		}

		function resetFilter() {
			state.filterSource = 'all'
			state.search = ''
		}

		return { state, resetPreview, resetFontSize, resetFilter }
	},
	{
		persist: true,
		tauri: { save: true, sync: false, autoStart: false },
	},
)
