<script setup lang="ts">
useLangMeta('home.seo', '/images/home/cryptocenter-cover.webp')
</script>

<template>
  <UiPulseOverlay />
  <main class="flex flex-col justify-center">
    <section aria-labelledby="hero">
      <HomeHero />
    </section>
    <section aria-labelledby="brand-list">
      <LazyHomeBrandList />
    </section>
    <section aria-labelledby="latest-news" class="mb32">
      <LazyHomeFeaturedNews />
    </section>
    <section aria-labelledby="pages-card" class="mb32">
      <LazyHomePagesCard />
    </section>
    <section aria-labelledby="crypto-pulse" class="mb32">
      <LazyHomePulseCard />
    </section>
  </main>
</template>
