<script setup lang="ts">
import { NuxtLinkLocale } from '#components'

const { t } = useI18n()

const pages = [
  {
    path: '/news',
    title: 'links.news',
    description: 'home.pageCard.article',
  },
  {
    path: '/about',
    title: 'links.about',
    description: 'home.pageCard.about',
  },
  {
    isShare: true,
    title: 'home.share.title',
    description: 'home.share.description',
    onClick: shareSite,
  },
]

function shareSite() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href,
    }).catch(() => {
      // пользователь мог отменить шаринг — это ок
    })
  }
}
</script>

<template>
  <nav class="grid grid-cols-1 mx-auto justify-items-center gap-6 p-6 md:grid-cols-2 xl:grid-cols-3 xl:w-5xl">
    <template
      v-for="(page, key) in pages"
      :key="page.path"
    >
      <UiScrollAnimation
        animation="fade-down"
        :delay="key * 250"
        :duration="1000"
      >
        <template v-if="!page.isShare">
          <NuxtLinkLocale :to="page.path" class="group relative block max-w-sm w-full cursor-pointer decoration-none" role="link">
            <div class="relative h-[180px] overflow-hidden border rounded-md p4 transition-all duration-300 group-hover:(scale-102 transform-gpu will-change-transform) core-border core-theme">
              <div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div class="relative h-full flex flex-col text-black dark:text-white">
                <div class="flex items-start justify-between">
                  <h2 id="page-card-title" class="text-4xl text-inherit font-bold">
                    {{ t(page.title) }}
                  </h2>
                  <Icon
                    name="lucide:arrow-up-right"
                    class="h6 w6 flex rounded-full p2 text-inherit transition-colors core-ui group-hover:(bg-black text-white) dark:group-hover:(bg-white text-black)"
                    aria-hidden="true"
                  />
                </div>
                <p class="flex-grow text-sm dark:text-white">
                  {{ t(page.description) }}
                </p>
              </div>
            </div>
          </NuxtLinkLocale>
        </template>
        <template v-else>
          <div class="group relative block max-w-sm w-full cursor-pointer decoration-none" role="button" @click="page.onClick">
            <div class="relative h-[180px] overflow-hidden border rounded-md p4 transition-all duration-300 group-hover:(scale-102 transform-gpu will-change-transform) core-border core-theme">
              <div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div class="relative h-full flex flex-col text-black dark:text-white">
                <div class="flex items-start justify-between">
                  <h2 id="page-card-title" class="text-4xl text-inherit font-bold">
                    {{ t(page.title) }}
                  </h2>
                  <Icon
                    name="lucide:bookmark"
                    class="h6 w6 flex rounded-full p2 text-inherit transition-colors core-ui group-hover:(bg-black text-white) dark:group-hover:(bg-white text-black)"
                    aria-hidden="true"
                  />
                </div>
                <p class="flex-grow text-sm dark:text-white">
                  {{ t(page.description) }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </UiScrollAnimation>
    </template>
  </nav>
</template>
