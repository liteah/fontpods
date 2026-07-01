<script setup lang="ts">
const fontListStore = useFontListStore()
const { supported, permission, filteredFonts, loading, checkPermission, loadFonts } = useFont()

const emptyState = computed<FontEmptyState | null>(() => {
	if (!supported.value) return 'unsupported'
	if (permission.value !== 'granted') return 'permission'
	if (loading.value) return null
	if (filteredFonts.value.length === 0) return 'empty'
	return null
})

const scrollArea = useTemplateRef('scrollArea')
const { width } = useElementSize(() => scrollArea.value?.$el)
const gap = 8
const minItemWidth = 200
const lanes = computed(() =>
	Math.min(4, Math.max(1, Math.floor((width.value - gap) / (minItemWidth + gap)))),
)

const isRow = computed(() => fontListStore.state.layout === 'row')

// Virtualize per row; each row is one virtual item carrying its slice of fonts
const rows = computed(() => {
	if (isRow.value) return filteredFonts.value.map((font) => [font])
	const n = Math.max(1, lanes.value)
	const out: FontData[][] = []
	for (let i = 0; i < filteredFonts.value.length; i += n) {
		out.push(filteredFonts.value.slice(i, i + n))
	}
	return out
})

const virtualize = computed(() => ({
	gap,
	lanes: 1,
	estimateSize: fontListStore.state.fontSize * 4 + 36,
}))

const gridStyle = computed(() => ({
	display: 'grid',
	gridTemplateColumns: `repeat(${lanes.value}, minmax(0, 1fr))`,
	gap: `${gap}px`,
}))

onMounted(async () => {
	await checkPermission()
	if (permission.value === 'granted') await loadFonts()
})
</script>

<template>
	<div class="flex flex-1">
		<FontListSidebar />
		<div class="flex-1">
			<FontEmpty v-if="emptyState" :state="emptyState" />
			<UScrollArea
				v-else
				v-slot="{ item }"
				ref="scrollArea"
				:items="rows"
				:virtualize="virtualize"
				shadow
				class="h-[calc(100vh-var(--ui-header-height))] w-full p-4 pr-2"
			>
				<div :style="!isRow && gridStyle">
					<FontListItem v-for="font in item" :key="font.postscriptName" :font="font" />
				</div>
			</UScrollArea>
		</div>
	</div>
</template>
