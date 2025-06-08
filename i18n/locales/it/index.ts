import { defineI18nLocale } from '#i18n'

export default defineI18nLocale(async () => ({
  app: await import('./app.json').then(r => r.default),
  home: await import('./home.json').then(r => r.default),
  news: await import('./news.json').then(r => r.default),
  error: await import('./error.json').then(r => r.default),
  links: await import('./links.json').then(r => r.default),
  share: await import('./share.json').then(r => r.default),
}))
