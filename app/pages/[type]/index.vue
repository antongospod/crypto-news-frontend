<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()

// Определяем тип контента из роута
const contentType = computed(() => route.params.type as string)

// Проверяем валидность типа контента
const validTypes = ['news', 'exclusive']
if (!validTypes.includes(contentType.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const page = ref(1)
const limit = 16
const hasMore = ref(true)
const isPending = ref(false)
const sentinel = ref<HTMLElement | null>(null)

// Динамические мета-данные в зависимости от типа
const metaKey = computed(() => `${contentType.value}.meta`)
const coverImage = computed(() =>
  contentType.value === 'exclusive'
    ? '/images/home/exclusive-cover.webp'
    : '/images/home/cryptocenter-cover.webp',
)

useLangMeta(metaKey.value, coverImage.value)

const adCards = [
  {
    id: 'defibank-card',
    title: () => t('news.cardTitleDefiBank'),
    description: () => t('news.cardDescriptionDefiBank'),
    img: '/images/news/defibank-card.webp',
    url: 'https://defibank.online/',
    tag: 'Sponsored',
    date: new Date().toISOString(),
    isAd: true,
    priority: 1,
  },
  {
    id: 'synergyslab-card',
    title: () => t('news.cardTitleSynergysLab'),
    description: () => t('news.cardDescriptionSynergysLab'),
    img: '/images/news/synergyslab-card.webp',
    url: 'https://www.synergyslab.com/',
    tag: 'Sponsored',
    date: new Date().toISOString(),
    isAd: true,
    priority: 2,
  },
]

// Определяем название коллекции в зависимости от типа и локали
function getCollectionName() {
  if (contentType.value === 'exclusive') {
    switch (locale.value) {
      case 'en':
        return 'exclusive_en'
      case 'ru':
        return 'exclusive_ru'
      case 'it':
        return 'exclusive_it'
      default:
        return 'exclusive_en'
    }
  }

  // Для обычных новостей
  return locale.value
}

// Типизированная функция для запроса коллекции
async function fetchPosts(skip: number, limit: number) {
  const collectionName = getCollectionName()

  return await queryCollection(collectionName)
    .order('date', 'DESC')
    .skip(skip)
    .limit(limit)
    .select('title', 'description', 'img', 'date', 'tag', 'path', 'alt')
    .all()
}

const { data: initialPosts, refresh, pending } = await useAsyncData(
  `${contentType.value}-posts-${locale.value}`,
  () => fetchPosts(0, limit),
  {
    transform: data => data || [],
  },
)

const posts = ref<any[]>([])

// Функция для вставки рекламных карточек
function insertAdCards(newsItems: any[], startIndex = 0) {
  const result = [...newsItems]
  const totalItems = result.length

  // Вставляем рекламу только если есть минимум 5 постов и это первая загрузка
  if (totalItems < 5 || startIndex > 0)
    return result

  // Рассчитываем позиции для равномерного распределения
  const maxPosition = Math.min(totalItems + 1, 15) // Максимум 15-я позиция (не последняя в первых 16)
  const minPosition = 2 // Минимум 3-я позиция (не первая)

  // Если у нас мало постов, используем фиксированные позиции
  let adPositions

  if (totalItems <= 8) {
    // Для малого количества постов - фиксированные позиции
    adPositions = [
      { position: 2, adIndex: 0 }, // DeFiBank на 3-й позиции
      { position: 5, adIndex: 1 }, // SynergysLab на 6-й позиции
    ]
  }
  else {
    // Для большого количества - равномерное распределение
    const availableSpan = maxPosition - minPosition
    const gap = Math.floor(availableSpan / 3) // Разделяем на 3 части для 2 карточек

    adPositions = [
      { position: minPosition + gap, adIndex: 0 }, // DeFiBank
      { position: minPosition + gap * 2, adIndex: 1 }, // SynergysLab
    ]
  }

  // Проверяем, чтобы карточки не были рядом (минимум 2 позиции между ними)
  // Добавляем проверку на существование элементов массива
  if (adPositions.length >= 2 && adPositions[0] && adPositions[1]) {
    if (Math.abs(adPositions[0].position - adPositions[1].position) < 3) {
      adPositions[1].position = adPositions[0].position + 3
    }
  }

  // Вставляем рекламу
  adPositions
    .reverse() // Вставляем с конца, чтобы не сбить индексы
    .forEach(({ position, adIndex }) => {
      if (position <= result.length && position < 16) {
        result.splice(position, 0, {
          ...adCards[adIndex],
        })
      }
    })

  return result
}

function initializePosts() {
  const initial = unref(initialPosts)
  const newsItems = [...(initial || [])]

  posts.value = insertAdCards(newsItems, 0)

  if (newsItems.length > 0) {
    page.value = 2
    hasMore.value = newsItems.length >= limit
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
    const newPosts = await fetchPosts(offset, limit)

    if (!newPosts || newPosts.length === 0) {
      hasMore.value = false
      return
    }

    if (newPosts.length < limit) {
      hasMore.value = false
    }

    const postsWithAds = offset === 0 ? insertAdCards(newPosts, 0) : newPosts

    posts.value.push(...postsWithAds)
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
  <div class="mx-auto text-black sm:mb-10 space-y-10 2xl:px-35 lg:px-25 md:px-5 xl:px-28 dark:text-white">
    <div class="mx-4 mt-5 flex flex-col lg:mx-10 sm:(mx-10 mt-15) space-y-2">
      <h1 class="mb-0 text-3xl font-semibold sm:text-5xl">
        {{ t(`${contentType}.title`) }}
      </h1>
      <p class="text-md break-words font-300 op70 sm:(w-2/3 text-xl) dark:text-gray-300">
        {{ t(`${contentType}.description`) }}
      </p>
    </div>

    <div v-if="pending && posts.length === 0" class="grid grid-cols-1 gap-5 rounded-sm p-4 lg:(grid-cols-3 gap-5) md:(grid-cols-2 gap-10) sm:(px-10 py-15)">
      <div v-for="i in 6" :key="i" class="relative overflow-hidden">
        <!-- Изображение скелетон -->
        <div class="relative aspect-[16/10] overflow-hidden rounded-md bg-gray-200 dark:bg-dark8">
          <div class="absolute inset-0 animate-shimmer from-transparent via-white/20 to-transparent bg-gradient-to-r -translate-x-full dark:via-white/10" />
        </div>

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
        :key="article.isAd ? article.id : `${article.path}-${locale}`"
        animation="fade-up"
        :delay="(index % limit) * 100"
        :duration="1200"
      >
        <!-- Рекламная карточка -->
        <a
          v-if="article.isAd"
          :href="article.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group h-full flex flex-col no-underline"
        >
          <div
            v-if="article.img"
            class="aspect-[16/10] overflow-hidden b-1 b-light-700 rounded-md b-solid dark:b-dark-700"
          >
            <NuxtImg
              crossorigin="anonymous"
              :alt="typeof article.title === 'function' ? article.title() : article.title"
              :title="typeof article.title === 'function' ? article.title() : article.title"
              loading="lazy"
              format="webp"
              height="325"
              width="577"
              class="h-full w-full object-cover transition duration-400 ease-in-out group-hover:scale-102"
              :src="article.img"
            />
          </div>

          <div class="flex flex-1 flex-col rounded-b-md pt-4 text-black dark:text-white">
            <div class="mb-2 children:(inline-flex core-border rounded-md core-ui px-4 py-1.5 text-xs font-mono op80 dark:op100) space-x-2">
              <p>
                {{ article.tag }}
              </p>
            </div>

            <h2 class="line-clamp-2 m-0 h-14 text-xl font-semibold decoration-2 sm:h-16 group-hover:(underline underline-offset-6)">
              {{ typeof article.title === 'function' ? article.title() : article.title }}
            </h2>

            <p class="line-clamp-3 mt-2 h-18 font-300 op70 sm:h-20">
              {{ typeof article.description === 'function' ? article.description() : article.description }}
            </p>
          </div>
        </a>

        <NuxtLinkLocale
          v-else
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
              height="325"
              width="577"
              class="h-full w-full object-cover transition duration-400 ease-in-out group-hover:scale-102"
              :src="article.img"
            />
          </div>

          <div class="flex flex-1 flex-col rounded-b-md pt-4 text-black dark:text-white">
            <div class="mb-2 children:(inline-flex core-border rounded-md core-ui px-4 py-1.5 text-xs font-mono op80 dark:op100) space-x-2">
              <UiDate v-if="article.date" :date="article.date" />
              <p v-if="article.tag">
                {{ useParseTags(article.tag) }}
              </p>
            </div>

            <h2 class="line-clamp-2 m-0 h-14 text-xl font-semibold decoration-2 sm:h-16 group-hover:(underline underline-offset-6)">
              {{ article.title }}
            </h2>

            <p class="line-clamp-3 mt-2 h-18 font-300 op70 sm:h-20">
              {{ article.description }}
            </p>
          </div>
        </NuxtLinkLocale>
      </UiScrollAnimation>
    </section>

    <div v-else class="min-h-[40vh] flex items-center justify-center">
      <p class="text-center text-lg op70">
        {{ t(`${contentType}.noPosts`) }}
      </p>
    </div>

    <div ref="sentinel" class="h-1" aria-hidden="true" />
  </div>
</template>
