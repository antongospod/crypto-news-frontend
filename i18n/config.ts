import type { LocaleObject } from '@nuxtjs/i18n'

export const LOCALES: LocaleObject[] = [
  {
    code: 'en',
    language: 'en',
    name: 'English',
    file: 'en/index.ts',
  },
  {
    code: 'it',
    language: 'it',
    name: 'Italiano',
    file: 'it/index.ts',
  },
  {
    code: 'ru',
    language: 'ru',
    name: 'Russian',
    file: 'ru/index.ts',
  },
]

export const DEFAULT_LOCALE = 'it'

export const i18nConfig = {
  defaultLocale: DEFAULT_LOCALE,
  lazy: false,
  strategy: 'prefix_except_default',
  locales: LOCALES,
  hmr: true,
  missingWarn: false,
  fallbackWarn: false,
  customRoutes: 'config',
  silentTranslationWarn: true,
  precompile: {
    strictMessage: true,
    escapeHtml: true,
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    cookieSecure: true,
    alwaysRedirect: true,
    redirectOn: 'root' as const,
  },
} as const
