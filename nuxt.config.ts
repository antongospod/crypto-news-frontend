import { i18nConfig } from './i18n/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
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
  fonts: {
    families: [
      {
        name: 'IBM Plex Mono',
        provider: 'local',
        weight: 400,
        style: 'normal',
        src: '/fonts/IBMPlexMono-Regular.woff2',
        display: 'swap',
      },
      {
        name: 'IBM Plex Mono',
        provider: 'local',
        weight: 400,
        style: 'italic',
        src: '/fonts/IBMPlexMono-Italic.woff2',
        display: 'swap',
      },
      {
        name: 'IBM Plex Mono',
        provider: 'local',
        weight: 500,
        style: 'normal',
        src: '/fonts/IBMPlexMono-Medium.woff2',
        display: 'swap',
      },
      {
        name: 'IBM Plex Mono',
        provider: 'local',
        weight: 500,
        style: 'italic',
        src: '/fonts/IBMPlexMono-MediumItalic.woff2',
        display: 'swap',
      },
      {
        name: 'IBM Plex Mono',
        provider: 'local',
        weight: 600,
        style: 'normal',
        src: '/fonts/IBMPlexMono-SemiBold.woff2',
        display: 'swap',
      },
      {
        name: 'IBM Plex Mono',
        provider: 'local',
        weight: 600,
        style: 'italic',
        src: '/fonts/IBMPlexMono-SemiBoldItalic.woff2',
        display: 'swap',
      },
    ],
  },
  icon: {
    provider: 'iconify',
    mode: 'svg',
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
    storageKey: 'cryptocenter-color-mode',
  },
  i18n: i18nConfig,
  css: [
    'normalize.css/normalize.css',
  ],
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
