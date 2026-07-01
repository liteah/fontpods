import type { LocaleObject } from '@nuxtjs/i18n'

export const locales: LocaleObject[] = [
	{
		code: 'en',
		file: 'en.json',
		language: 'en',
		name: 'English',
		key: 'english',
	},
	{
		code: 'zh-CN',
		file: 'zh-cn.json',
		language: 'zh-Hans-CN',
		name: '简体中文',
		key: 'simplified-chinese',
	},
	{
		code: 'zh-TW',
		file: 'zh-tw.json',
		language: 'zh-Hant-TW',
		name: '繁體中文',
		key: 'traditional-chinese',
	},
]

export const availableLocales = [...locales].sort((a, b) => a.code.localeCompare(b.code))

export type AvailableLocales = (typeof locales)[number]['code']
