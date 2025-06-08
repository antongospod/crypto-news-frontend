<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const slug = route.path as string

const { data: post } = await useAsyncData(
  `post-${slug}-${locale.value}`,
  () => queryCollection(locale.value)
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

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  ogTitle: `${seoTitle}${titleSuffix}`,
  ogDescription: seoDesc,
  ogType: 'article',
  ogImage: seoImage,
  twitterCard: 'summary_large_image',
  twitterTitle: `${seoTitle}${titleSuffix}`,
  twitterDescription: seoDesc,
  twitterImage: seoImage,
})
</script>

<template>
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
