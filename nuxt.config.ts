import { i18nConfig } from './i18n/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@unocss/nuxt',
    '@nuxthq/studio',
  ],
  runtimeConfig: {
    public: {
      version: '1.0.4-alpha',
      environment: process.env.NODE_ENV,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteTitle: process.env.NUXT_PUBLIC_SITE_NAME,
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
  sitemap: {
    autoI18n: true,
    strictNuxtContentPaths: true,
    autoLastmod: true,
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '50%' },
    ],
    xslTips: false,
    credits: false,
  },
  routeRules: {
    '/news/**': { isr: true },
  },
  i18n: {
    ...i18nConfig,
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://cryptocenter.finance',
  },
  content: {
    database: {
      type: 'sqlite',
      filename: process.env.NODE_ENV === 'production' ? '/tmp/contents.sqlite' : './.data/content/contents.sqlite',
    },
  },
  studio: {
    gitInfo: {
      name: 'crypto-news-frontend',
      owner: 'antongospod',
      url: 'https://github.com/antongospod/crypto-news-frontend',
    },
  },
  css: [
    'normalize.css/normalize.css',
  ],
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
    preset: 'node-server',
  },
  devtools: {
    enabled: false,
  },
})
