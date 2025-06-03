import { i18nConfig } from './i18n/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
      version: '1.0.0',
      environment: process.env.NODE_ENV,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteTitle: process.env.NUXT_PUBLIC_SITE_NAME,
      i18n: {
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
      },
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
    storageKey: 'cryptocenter-color-mode',
  },
  icon: {
    provider: 'iconify',
    mode: 'svg',
  },
  i18n: i18nConfig,
  routeRules: {
    '/**': {
      static: true,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  },
  experimental: {
    headNext: true,
    viewTransition: true,
  },
  sourcemap: false,
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    future: {
      nativeSWR: true,
    },
  },
  devtools: {
    enabled: false,
  },
})
