<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center bg-white dark:bg-black">
    <div class="hidden md:(absolute inset-0 z-0 flex items-center justify-center)" aria-hidden="true">
      <HomeHeroBackground class="h-80% w-full object-cover" />
    </div>

    <div
      class="relative z-10 mx-auto flex flex-col px-5 py-10 sm:items-center sm:text-center"
    >
      <UiScrollAnimation animation="fade-down" :duration="1000" :delay="400">
        <div
          class="mb-2 flex animate-float items-center text-sm text-brand-light font-semibold uppercase space-x-2 dark:text-yellow-400"
          role="doc-subtitle"
        >
          <Icon name="lucide:sparkles" class="h-6 w-6 text-inherit" aria-hidden="true" />
          <span>{{ t('page.home.hero.tagline') }}</span>
        </div>
      </UiScrollAnimation>
      <UiScrollAnimation animation="zoom-in" :duration="1200">
        <div class="relative">
          <h1
            id="hero"
            class="relative m-0 mb-10 max-w-[90%] max-w-4xl w-full text-5xl text-black md:text-7xl dark:text-white"
          >
            {{ t('page.home.hero.heading') }}
          </h1>
        </div>
        <p class="mx-auto max-w-[90%] max-w-lg w-full text-sm text-black font-300 op-70 md:text-lg dark:text-white">
          {{ t('page.home.hero.subhead') }}
        </p>
      </UIScrollAnimation>

      <UiScrollAnimation animation="fade-down" :duration="1000" :delay="400">
        <NuxtLinkLocale
          class="mt-5 flex items-center border-brand-light rounded-full border-dashed px-5 py-1.5 text-center text-blue-6 no-underline transition duration-300 ease-in-out <sm:mr-auto space-x-1 core-border dark:border-yellow-3 hover:(border-solid) core-theme dark:text-yellow-4"
          to="/news"
        >
          <span class="m-0">
            {{ t('page.home.hero.cta') }}
          </span>
          <Icon name="lucide:arrow-up-right" class="h-5 w-5" aria-hidden="true" />
        </NuxtLinkLocale>
      </UiScrollAnimation>
    </div>
  </div>
</template>
