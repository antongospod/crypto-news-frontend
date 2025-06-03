import { defineI18nLocale } from '#i18n'

export default defineI18nLocale(async () => ({
  nav: await import('./nav.json').then(r => r.default),
  page: await import('./page.json').then(r => r.default),
  error: await import('./error.json').then(r => r.default),
}))
