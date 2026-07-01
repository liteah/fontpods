<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const appConfig = useAppConfig()

const fontStore = useFontStore()
const fontListStore = useFontListStore()
const { filteredFonts, loadFonts, loading } = useFont()

const { state } = storeToRefs(fontListStore)

const previewLayout = computed<TabsItem[]>(() => [
	{
		label: $t('font.layout.rows'),
		icon: appConfig.ui.icons.rows,
		value: 'row',
	},
	{
		label: $t('font.layout.grid'),
		icon: appConfig.ui.icons.grid,
		value: 'grid',
	},
])

const filterSourceItems = computed<TabsItem[]>(() => [
	{
		label: $t('font.source.all'),
		value: 'all',
	},
	{
		label: $t('font.source.local'),
		value: 'local',
	},
	{
		label: $t('font.source.web'),
		value: 'web',
	},
	{
		label: $t('font.source.favorites'),
		value: 'favorites',
	},
])
</script>

<template>
	<USidebar rail collapsible="offcanvas">
		<div class="flex h-full flex-col gap-4">
			<div class="flex w-full flex-col gap-2">
				<div class="flex items-center justify-between">
					<span class="text-sm">
						{{
							$t('font.count', {
								count: filteredFonts.length,
								total: fontStore.totalCount,
							})
						}}
					</span>
					<UTooltip :text="$t('font.refresh')">
						<UButton
							:icon="appConfig.ui.icons.refresh"
							color="neutral"
							variant="ghost"
							size="xs"
							:loading="loading"
							@click="loadFonts"
						/>
					</UTooltip>
				</div>
				<UInput
					v-model="state.search"
					:icon="appConfig.ui.icons.search"
					:placeholder="$t('font.search')"
				/>
				<div class="flex min-w-full gap-2">
					<UTabs
						v-model="state.layout"
						:items="previewLayout"
						color="neutral"
						size="sm"
						:content="false"
					/>
					<UButton
						:icon="appConfig.ui.icons.plus"
						:label="$t('font.add')"
						color="neutral"
						variant="soft"
						size="sm"
						class="w-full"
					/>
				</div>
			</div>
			<USeparator />
			<div class="flex flex-col gap-2">
				<UFormField :label="$t('font.preview')">
					<UTextarea
						v-model="state.previewText"
						:placeholder="$t('font.preview-placeholder')"
						:rows="2"
						autoresize
					/>
					<template #hint>
						<UTooltip :text="$t('font.reset')">
							<UButton
								:icon="appConfig.ui.icons.reset"
								color="neutral"
								variant="ghost"
								size="xs"
								@click="fontListStore.resetPreview"
							/>
						</UTooltip>
					</template>
				</UFormField>
				<UFormField :label="$t('font.fontSize')" orientation="horizontal">
					<FontSizeInput v-model="state.fontSize" class="max-w-26" />
				</UFormField>
			</div>
			<USeparator />
			<UFormField :label="$t('font.filter')">
				<UTabs
					v-model="state.filterSource"
					:items="filterSourceItems"
					color="neutral"
					size="sm"
					:content="false"
				/>
				<template #hint>
					<UTooltip :text="$t('font.reset')">
						<UButton
							:icon="appConfig.ui.icons.reset"
							color="neutral"
							variant="ghost"
							size="xs"
							@click="fontListStore.resetFilter"
						/>
					</UTooltip>
				</template>
			</UFormField>
		</div>
	</USidebar>
</template>
