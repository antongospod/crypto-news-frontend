<script setup lang="ts">
const links = useNavLinks(
  { name: 'links.home', url: '/' },
  { name: 'links.latest', url: '/latest' },
  { name: 'links.about', url: '/about' },
)

const { locales, setLocale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code)
})
</script>

<template>
  <header
    class="mx-auto h-12 flex items-center justify-between b-1 border-b-dark-4/10 b-solid b-l-none b-r-none b-t-none bg-element-light/80 p-2 text-black backdrop-blur-md dark:(border-b-dark-2/30 bg-element-dark/80 text-white) 2xl:px-40 md:px-6 xl:px-25"
  >
    <NuxtLinkLocale to="/" class="text-inherit">
      <AppLogo class="h-8 flex" />
    </NuxtLinkLocale>
    <nav class="hidden md:(decoration-none space-x-2)">
      <NuxtLinkLocale
        v-for="(link, index) in links"
        :key="index"
        class="text-inherit underline-2 decoration-transparent underline-offset-6 transition duration-350 ease-out hover:(underline-black duration-150 ease-in) dark:hover:underline-white"
        active-class="underline-2 underline-black dark:underline-white"
        :to="link.url"
      >
        {{ t(link.name) }}
      </NuxtLinkLocale>
    </nav>
    <div class="hidden md:(flex items-center gap-2 space-x-2)" role="group">
      <nav class="md:(decoration-none space-x-4)">
        <NuxtLinkLocale
          v-for="(link, index) in links"
          :key="index"
          class="text-inherit underline-2 decoration-transparent underline-offset-6 transition duration-350 ease-out hover:(underline-black duration-150 ease-in) dark:hover:underline-white"
          active-class="underline-2 underline-black dark:underline-white"
          :to="link.url"
        >
          {{ t(link.name) }}
        </NuxtLinkLocale>
      </nav>

      <UiColorSwitch />

      <div class="md:(inline-flex gap1 core-border rounded-full core-ui p1)" role="navigation">
        <NuxtLink
          v-for="locale in availableLocales" :key="locale.code"
          :aria-label="t('app.sr.lang_select') + locale.name" :to="switchLocalePath(locale.code)"
          active-class="!dark:(bg-white text-black) text-white bg-black pointer-events-none order-first"
          class="rounded-full px3 py1 text-center text-sm text-black font-medium decoration-none hover:bg-gray200 hover:core-ui dark:text-inherit dark:hover:bg-dark-600"
          @click.prevent.capture="setLocale(locale.code)"
        >
          {{ locale.code }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
