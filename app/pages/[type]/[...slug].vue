<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

// Определяем тип контента из роута
const contentType = route.params.type as string

// Проверяем валидность типа контента
const validTypes = ['news', 'exclusive']
if (!validTypes.includes(contentType)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const slug = route.path as string

// Определяем название коллекции в зависимости от типа и локали
function getCollectionName() {
  if (contentType === 'exclusive') {
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

// Получаем пост
const { data: post } = await useAsyncData(
  `post-${contentType}-${slug}-${locale.value}`,
  () => queryCollection(getCollectionName())
    .where('path', '=', slug)
    .select('path', 'title', 'body', 'toc', 'description', 'img', 'date', 'tag', 'alt', 'updated')
    .first(),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}

const seoTitle = post.value.title
const seoDesc = post.value.description
const seoImage = post.value.img ? post.value.img : undefined
const titleSuffix = ' - Cryptocenter'

// Добавляем префикс для эксклюзивного контента
const seoPrefix = contentType === 'exclusive' ? 'Exclusive: ' : ''

useSeoMeta({
  title: `${seoPrefix}${seoTitle}`,
  description: seoDesc,
  ogTitle: `${seoPrefix}${seoTitle}${titleSuffix}`,
  ogDescription: seoDesc,
  ogType: 'article',
  ogImage: seoImage,
  twitterCard: 'summary_large_image',
  twitterTitle: `${seoPrefix}${seoTitle}${titleSuffix}`,
  twitterDescription: seoDesc,
  twitterImage: seoImage,
})
</script>

<template>
  <UiPulseOverlay />
  <main v-if="post" class="mx-auto mt-10 md:(mb-0 mt-15 px-6) sm:mt-10">
    <article
      class="pb-2 text-inherit md:(mb-12) sm:rounded-sm"
      itemtype="https://schema.org/Article"
      itemscope
    >
      <NewsArticleHeader :post="post" />

      <div class="flex flex-col-reverse justify-center lg:(flex-row gap10)">
        <div>
          <ContentRenderer
            :value="post"
            itemprop="articleBody"
            class="mx-auto max-w-3xl px-4 leading-normal prose md:px-0 dark:prose-invert"
          />
        </div>

        <aside v-if="post.body?.toc && post.body.toc.links?.length">
          <NewsToc
            :links="post.body.toc.links"
            class="lg:sticky lg:top-20"
          />
        </aside>
      </div>
    </article>
  </main>
</template>
