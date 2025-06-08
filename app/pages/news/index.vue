<script setup lang="ts">
const { locale, t } = useI18n()

const page = ref(1)
const limit = 16
const hasMore = ref(true)
const isPending = ref(false)
const sentinel = ref<HTMLElement | null>(null)

useLangMeta('news.meta', '/images/home/cryptocenter-cover.webp')

const { data: initialPosts, refresh, pending } = await useAsyncData(
  `news-posts-${locale.value}`, // Уникальный ключ с учетом языка
  () => queryCollection(locale.value)
    .order('date', 'DESC')
    .skip(0)
    .limit(limit)
    .select('title', 'description', 'img', 'date', 'tag', 'path', 'alt')
    .all(),
  {
    transform: data => data || [],
  },
)

const posts = ref<any[]>([])

function initializePosts() {
  const initial = unref(initialPosts)
  posts.value = [...(initial || [])]

  if (posts.value.length > 0) {
    page.value = 2
    hasMore.value = posts.value.length >= limit
  }
  else {
    page.value = 1
    hasMore.value = false
  }
}

initializePosts()

async function loadMorePosts() {
  if (isPending.value || !hasMore.value)
    return

  isPending.value = true

  try {
    const offset = (page.value - 1) * limit
    const newPosts = await queryCollection(locale.value)
      .order('date', 'DESC')
      .skip(offset)
      .limit(limit)
      .select('title', 'description', 'img', 'date', 'tag', 'path', 'alt')
      .all()

    if (!newPosts || newPosts.length === 0) {
      hasMore.value = false
      return
    }

    if (newPosts.length < limit) {
      hasMore.value = false
    }

    posts.value.push(...newPosts)
    page.value++
  }
  catch (error) {
    console.error('Error loading more posts:', error)
    hasMore.value = false
  }
  finally {
    isPending.value = false
  }
}

watch(locale, async () => {
  page.value = 1
  hasMore.value = true
  posts.value = []

  await refresh()
  initializePosts()
})

watch(initialPosts, () => {
  if (posts.value.length === 0) {
    initializePosts()
  }
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && hasMore.value && !isPending.value) {
        loadMorePosts()
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    },
  )

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <UiPulseOverlay />
  <main class="mx-auto text-black sm:mb-10 space-y-10 2xl:px-35 lg:px-25 md:px-5 xl:px-28 dark:text-white">
    <div class="mx-4 mt-5 flex flex-col lg:mx-10 sm:(mx-10 mt-15) space-y-2">
      <h1 class="mb-0 text-3xl font-semibold sm:text-5xl">
        {{ t('news.title') }}
      </h1>
      <p class="text-md break-words font-300 op70 sm:(w-2/3 text-xl) dark:text-gray-300">
        {{ t('news.description') }}
      </p>
    </div>

    <!-- Показываем скелетон при первой загрузке -->
    <div v-if="pending && posts.length === 0" class="grid grid-cols-1 gap-5 rounded-sm p-4 lg:(grid-cols-3 gap-5) md:(grid-cols-2 gap-10) sm:(px-10 py-15)">
      <div v-for="i in 6" :key="i" class="relative overflow-hidden">
        <!-- Изображение скелетон -->
        <div class="relative aspect-[16/10] overflow-hidden rounded-md bg-gray-200 dark:bg-dark8">
          <div class="absolute inset-0 animate-shimmer from-transparent via-white/20 to-transparent bg-gradient-to-r -translate-x-full dark:via-white/10" />
        </div>
        <!-- Текстовые скелетоны -->
        <div class="mt-4 space-y-2">
          <div class="relative h-4 w-3/4 overflow-hidden rounded bg-gray-200 dark:bg-dark8">
            <div class="absolute inset-0 animate-shimmer-delayed-200 from-transparent via-white/20 to-transparent bg-gradient-to-r -translate-x-full dark:via-white/10" />
          </div>
          <div class="relative h-3 overflow-hidden rounded bg-gray-200 dark:bg-dark8">
            <div class="absolute inset-0 animate-shimmer-delayed-400 from-transparent via-white/20 to-transparent bg-gradient-to-r -translate-x-full dark:via-white/10" />
          </div>
          <div class="relative h-3 w-5/6 overflow-hidden rounded bg-gray-200 dark:bg-dark8">
            <div class="absolute inset-0 animate-shimmer-delayed-600 from-transparent via-white/20 to-transparent bg-gradient-to-r -translate-x-full dark:via-white/10" />
          </div>
        </div>
      </div>
    </div>

    <section
      v-else-if="posts.length > 0"
      class="grid grid-cols-1 gap-5 rounded-sm p-4 lg:(grid-cols-3 gap-5) md:(grid-cols-2 gap-10) sm:(px-10 py-15)"
    >
      <UiScrollAnimation
        v-for="(article, index) in posts"
        :key="`${article.path}-${locale}`"
        animation="fade-up"
        :delay="(index % limit) * 100"
        :duration="1200"
      >
        <NuxtLinkLocale
          class="group h-full flex flex-col no-underline"
          :to="article.path"
        >
          <div
            v-if="article.img"
            class="aspect-[16/10] overflow-hidden b-1 b-light-700 rounded-md b-solid dark:b-dark-700"
          >
            <NuxtImg
              crossorigin="anonymous"
              :alt="article.alt || article.title"
              :title="article.alt || article.title"
              loading="lazy"
              format="webp"
              class="h-full w-full object-cover transition duration-400 ease-in-out group-hover:scale-102"
              :src="article.img"
            />
          </div>

          <div class="flex flex-1 flex-col justify-between rounded-b-md pt-4 text-black dark:text-white">
            <div class="mb-2 children:(inline-flex core-border rounded-md core-ui px-4 py-1.5 text-xs font-mono op80 dark:op100) space-x-2">
              <UiDate v-if="article.date" :date="article.date" />
              <p v-if="article.tag">
                {{ useParseTags(article.tag) }}
              </p>
            </div>

            <h2 class="m-0 text-xl font-semibold decoration-2 group-hover:(underline underline-offset-6)">
              {{ article.title }}
            </h2>

            <p class="line-clamp-3 mt-1 font-300 op70">
              {{ article.description }}
            </p>
          </div>
        </NuxtLinkLocale>
      </UiScrollAnimation>
    </section>

    <p v-else class="text-center op70">
      {{ t('news.noPosts') }}
    </p>

    <div ref="sentinel" class="h-1" aria-hidden="true" />
  </main>
</template>
