export default defineAppConfig({
	app: {
		name: 'FontPods',
	},
	routes: {
		settings: '/settings',
	},
	ui: {
		colors: {
			primary: 'blue',
			neutral: 'neutral',
		},
		button: {
			slots: {
				base: 'cursor-pointer',
			},
		},
		formField: {
			slots: {
				root: 'w-full',
			},
		},
		select: {
			slots: {
				content: 'min-w-fit',
				trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
			},
		},
		selectMenu: {
			slots: {
				content: 'min-w-fit',
				trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
			},
		},
		input: {
			slots: {
				root: 'w-full',
			},
		},
		inputMenu: {
			slots: {
				root: 'w-full',
				content: 'min-w-fit',
			},
		},
		textarea: {
			slots: {
				root: 'w-full',
				base: 'resize-none',
			},
		},
		accordion: {
			slots: {
				trigger: 'cursor-pointer',
				item: 'md:py-2',
			},
		},
		navigationMenu: {
			slots: {
				link: 'cursor-pointer',
			},
		},
		tabs: {
			compoundVariants: [
				{
					color: 'neutral',
					variant: 'pill',
					class: {
						indicator: 'bg-default',
						trigger: [
							'data-[state=active]:text-default outline-default/25 focus-visible:outline-3',
							'in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-default',
						],
					},
				},
			],
		},
		sidebar: {
			slots: {
				gap: 'h-[calc(100%-var(--ui-header-height))]',
				container:
					'absolute top-(--ui-header-height) bottom-0 h-[calc(100%-var(--ui-header-height))]',
			},
		},
		icons: {
			arrowDown: 'i-ph-arrow-down',
			arrowLeft: 'i-ph-arrow-left',
			arrowRight: 'i-ph-arrow-right',
			arrowUp: 'i-ph-arrow-up',
			caution: 'i-ph-warning-circle',
			check: 'i-ph-check',
			chevronDoubleLeft: 'i-ph-caret-double-left',
			chevronDoubleRight: 'i-ph-caret-double-right',
			chevronDown: 'i-ph-caret-down',
			chevronLeft: 'i-ph-caret-left',
			chevronRight: 'i-ph-caret-right',
			chevronUp: 'i-ph-caret-up',
			close: 'i-ph-x',
			copy: 'i-ph-copy',
			copyCheck: 'i-ph-check-circle',
			dark: 'i-ph-moon',
			drag: 'i-ph-dots-six-vertical',
			ellipsis: 'i-ph-dots-three',
			error: 'i-ph-x-circle',
			external: 'i-ph-arrow-up-right',
			eye: 'i-ph-eye',
			eyeOff: 'i-ph-eye-slash',
			file: 'i-ph-file',
			folder: 'i-ph-folder',
			folderOpen: 'i-ph-folder-open',
			hash: 'i-ph-hash',
			info: 'i-ph-info',
			light: 'i-ph-sun',
			loading: 'i-ph-circle-notch',
			menu: 'i-ph-list',
			minus: 'i-ph-minus',
			panelClose: 'i-ph-caret-left',
			panelOpen: 'i-ph-caret-right',
			plus: 'i-ph-plus',
			reload: 'i-ph-arrow-counter-clockwise',
			search: 'i-ph-magnifying-glass',
			stop: 'i-ph-square',
			star: 'i-ph-star',
			success: 'i-ph-check-circle',
			system: 'i-ph-monitor',
			tip: 'i-ph-lightbulb',
			upload: 'i-ph-upload',
			warning: 'i-ph-warning',
			// app extend
			square: 'i-ph-square',
			reset: 'i-ph-arrow-counter-clockwise',
			refresh: 'i-ph-arrows-clockwise',
			rows: 'i-ph-rows',
			grid: 'i-ph-grid-nine',
			text: 'i-ph-text-t',
			starFill: 'i-ph-star-fill',
			settings: 'i-ph-gear-fine',
			globe: 'i-ph-globe-simple',
			appearance: 'i-ph-palette',
			colorMode: 'i-ph-circle-half',
		},
	},
})
