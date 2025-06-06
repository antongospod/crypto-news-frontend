<script setup lang="ts">
const { locale, t } = useI18n()

const { data: features } = await useAsyncData('featured-posts', () => {
  return queryCollection(locale.value)
      .where('feature', '=', true)
      .order('date', 'DESC')
      .select('title', 'description', 'date', 'tag', 'path')
      .limit(5)
      .all()
})
</script>


<template>
  <div class="mx-auto bg-light-3 py10 dark:bg-dark-900">
    <div class="mx-auto mt10 max-w-lg flex items-center justify-between px6 md:max-w-5xl 2xl:px45 xl:px25">
      <div class="mb-10 flex flex-col justify-center space-y-2">
        <UiScrollAnimation
            id="latest-posts"
            class="m0 text-4xl font-bold tracking-wide md:text-5xl"
            element="h2"
            animation="fade-down"
            :duration="800"
        >
          {{ t('home.news.latest') }}
        </UiScrollAnimation>
        <UiScrollAnimation
            class="m0 text-sm text-dark-400 dark:text-gray-200"
            element="p"
            animation="fade-down"
            :duration="800"
            :delay="100"
        >
          {{ t('home.news.description') }}
        </UiScrollAnimation>
      </div>
    </div>
    <div
      class="grid auto-rows-fr grid-cols-1 mx-auto max-w-lg justify-items-center gap-4 px6 pb10 lg:grid-cols-3 md:grid-cols-2 md:max-w-5xl children:(core-border rounded-lg) 2xl:px45 xl:px25"
      role="feed" :aria-label="t('home.news.featuredPosts')"
    >
      <article
        v-for="(feature, key) in features?.slice(0, 3)"
        :key="feature.path"
        class="group transition duration-300 ease-linear hover:(scale-102 bg-white shadow-lg dark:bg-black will-change-transform transform-gpu) core-theme"
      >
        <UiScrollAnimation
          class="col-span-1 cursor-pointer p-5 dark:text-white"
          animation="fade-down"
          :delay="key * 250"
          :duration="1200"
        >
          <NuxtLinkLocale class="group-hover text-black no-underline dark:text-white" :to="feature.path">
            <div v-if="feature.tag" class="mb-2 flex flex-wrap gap-1">
              <span
                  v-for="(tag, i) in useParseTags(feature.tag, 3)"
                  :key="i"
                  class="rounded-md bg-light2 px4 py1 text-sm op-90 core-border dark:bg-dark8"
              >
                {{ tag }}
              </span>
            </div>

            <h3 class="group-hover:text-primary text-xl font-semibold">
              {{ feature.title }}
            </h3>
            <p class="font-300 op70 group-hover:op-100">
              {{ feature.description }}
            </p>
          </NuxtLinkLocale>
        </UiScrollAnimation>
      </article>

      <UiScrollAnimation
        animation="zoom-in"
        :duration="1200"
        class="relative hidden lg:(grid col-span-2 row-span-2)"
      >
        <NuxtImg
          src="/images/home/cryptocenter-cover.webp" class="h-full w-full rounded-lg object-cover"
          alt="Сryptocenter Graphic"
          loading="lazy"
          format="webp"
          sizes="1400px"
        />
        <NuxtLink
          to="https://cryptocenter.finance"
          class="absolute bottom-2 right-2 rounded-md px3 py1 text-sm underline-none decoration-none core-border core-ui hover:core-theme"
        >
          cryptocenter.finance
        </NuxtLink>
      </UiScrollAnimation>

      <article
        v-for="(feature, key) in features?.slice(3, 6)" :key="feature.path"
        class="group transition duration-300 ease-linear hover:(scale-102 bg-white shadow-lg dark:bg-black will-change-transform transform-gpu) core-theme"
        role="article"
      >
        <UiScrollAnimation
            class="col-span-1 cursor-pointer p-5 dark:text-white"
            animation="fade-down"
            :delay="key * 250"
            :duration="1200"
        >
          <NuxtLinkLocale
            class="group-hover text-black no-underline dark:text-white" :to="feature.path"
            :aria-label="`Read ${feature.title}`"
          >
            <div v-if="feature.tag" class="mb-2 flex flex-wrap gap-1">
              <span
                  v-for="(tag, i) in useParseTags(feature.tag, 1)"
                  :key="i"
                  class="rounded-md bg-light2 px4 py1 text-sm op-90 core-border dark:bg-dark8"
              >
                {{ tag }}
              </span>
            </div>
            <h3 class="group-hover:text-primary text-xl font-semibold">
              {{ feature.title }}
            </h3>
            <p class="font-300 op70 group-hover:op-100">
              {{ feature.description }}
            </p>
          </NuxtLinkLocale>
        </UiScrollAnimation>
      </article>
    </div>
  </div>
</template>
