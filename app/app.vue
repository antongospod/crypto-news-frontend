<script setup lang="ts">
const head = useLocaleHead({
  dir: true,
  seo: true,
  lang: true,
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
      sizes: 'any',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-96x96.png',
      sizes: '96x96',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'preload',
      href: '/fonts/IBMPlexMono-Regular.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/IBMPlexMono-Italic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/IBMPlexMono-Medium.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/IBMPlexMono-MediumItalic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/IBMPlexMono-SemiBold.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/IBMPlexMono-SemiBoldItalic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://cdn.cryptocenter.finance',
      crossorigin: 'anonymous',
    },
  ],
  meta: [
    { name: 'og:logo', content: '/apple-touch-icon.png' },
  ],
})

const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  titleTemplate: `%s - ${runtimeConfig.public.siteTitle}`,
  twitterCard: 'summary_large_image',
  ogType: 'website',
  ogSiteName: 'CryptoCenter',
  charset: 'utf-8',
  formatDetection: 'telephone=no',
  colorScheme: 'dark light',
})
</script>

<template>
  <Html v-if="head.htmlAttrs" :lang="head.htmlAttrs.lang" class="scroll-pt-[73px] antialiased">
    <Head>
      <template
        v-for="link in head.link"
        :key="link.id"
      >
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template
        v-for="meta in head.meta"
        :key="meta.id"
      >
        <Meta
          :id="meta.id"
          :property="meta.property"
          :content="meta.content"
        />
      </template>
    </Head>
    <Body class="m0 font-mono core-theme">
      <NuxtPage />
    </Body>
  </Html>
</template>
