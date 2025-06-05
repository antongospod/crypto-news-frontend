<script setup lang="ts">
/* TODO: заменить на актуальное изображение из нашего cdn */
const seoImage = 'https://images.pexels.com/photos/5708251/pexels-photo-5708251.jpeg'
useLangMeta('page.home.seo', seoImage)
</script>

<template>
  <main class="flex flex-col justify-center">
    <section aria-labelledby="hero">
      <HomeHero />
    </section>
    <section aria-labelledby="brand-list">
      <HomeBrandList />
    </section>
    <section aria-labelledby="latest-posts" class="mb32">
      <HomePostsFeature />
    </section>
    <section aria-labelledby="pages-card" class="mb32">
      Pages Card
    </section>
    <section aria-labelledby="crypto-pulse" class="mb32">
      Crypto Pulse
    </section>
  </main>
</template>
