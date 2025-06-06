<script setup lang="ts">
const { locale, t } = useI18n()

const page = ref(1)
const limit = 4
const hasMore = ref(true)
const isPending = ref(false)
const sentinel = ref<HTMLElement | null>(null)

useLangMeta('news.meta', '/images/home/cryptocenter-cover.webp')

const { data: initialPosts } = await useAsyncData('news-posts', () => {
  const offset = (page.value - 1) * limit
  return queryCollection(locale.value)
      .where('feature', '=', true)
      .order('date', 'DESC')
      .skip(offset)
      .limit(limit)
      .select('title', 'description', 'img', 'date', 'tag', 'path', 'alt')
      .all()
})

const posts = ref(structuredClone(initialPosts.value))

if (posts.value?.length) {
  page.value++
  if (posts.value.length < limit) hasMore.value = false
} else {
  hasMore.value = false
}

async function loadMorePosts() {
  if (isPending.value || !hasMore.value) return

  isPending.value = true

  const offset = (page.value - 1) * limit
  const newPosts = await queryCollection(locale.value)
      .where('feature', '=', true)
      .order('date', 'DESC')
      .skip(offset)
      .limit(limit)
      .select('title', 'description', 'img', 'date', 'tag', 'path', 'alt')
      .all()

  if (newPosts.length < limit) {
    hasMore.value = false
  }

  posts.value?.push(...newPosts)
  page.value++
  isPending.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMorePosts()
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
  )

  if (sentinel.value) observer.observe(sentinel.value)

  onUnmounted(() => observer.disconnect())
})

</script>

<template>
  <main class="mx-auto text-black sm:mb-10 space-y-10 2xl:px-35 lg:px-25 md:px-5 xl:px-28 dark:text-white">
    <div class="mx-4 mt-5 flex flex-col lg:mx-10 sm:(mx-10 mt-15) space-y-2">
      <h1 class="mb-0 text-3xl font-semibold sm:text-5xl">
        {{ t("news.title") }}
      </h1>
      <p class="text-md break-words font-300 op70 sm:(w-2/3 text-xl) dark:text-gray-300">
        {{ t("news.description") }}
      </p>
    </div>
    <section
        v-if="posts?.length"
        class="grid grid-cols-1 gap-5 rounded-sm p-4 lg:(grid-cols-3 gap-5) md:(grid-cols-2 gap-10) sm:(px-10 py-15)"
    >
      <UiScrollAnimation
          v-for="(article, key) in posts"
          :key="article.path"
          animation="fade-up"
          :delay="key * 100"
          :duration="1200"
      >
        <NuxtLinkLocale
            class="group flex flex-col no-underline h-full"
            :to="article.path"
        >
          <!-- Обёртка для изображения с фиксированным соотношением сторон -->
          <div v-if="article.img" class="aspect-[16/10] overflow-hidden rounded-md b-1 b-light-700 b-solid dark:b-dark-700">
            <NuxtImg
                crossorigin="anonymous"
                :alt="article.alt"
                :title="article.alt"
                loading="lazy"
                format="webp"
                class="h-full w-full object-cover transition duration-400 ease-in-out group-hover:scale-102"
                :src="article.img"
            />
          </div>

          <!-- Текстовая часть -->
          <div class="flex flex-col justify-between flex-1 rounded-b-md pt-4 text-black dark:text-white">
            <div class="children:(inline-flex core-border rounded-md core-ui px-4 py-1.5 text-xs font-mono op80 dark:op100) space-x-2 mb-2">
              <UiDate v-if="article.date" :date="article.date" />
              <p v-if="article.tag">
                {{ useParseTags(article.tag, 1) }}
              </p>
            </div>

            <h2 class="m-0 text-xl font-semibold decoration-2 group-hover:(underline underline-offset-6)">
              {{ article.title }}
            </h2>

            <p class="font-300 op70 line-clamp-3 mt-1">
              {{ article.description }}
            </p>
          </div>
        </NuxtLinkLocale>
      </UiScrollAnimation>
    </section>
    <p ref="sentinel" class="text-center op70">
      <template v-if="!hasMore && !posts?.length">
        {{ t('news.noPosts') }}
      </template>
    </p>
  </main>
</template>