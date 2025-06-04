import { defineI18nLocale } from '#i18n'

export default defineI18nLocale(async () => ({
  page: await import('./page.json').then(r => r.default),
  error: await import('./error.json').then(r => r.default),
  links: await import('./links.json').then(r => r.default),
}))
