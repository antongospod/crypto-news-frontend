<script setup lang="ts">
const links = useNavLinks(
  { name: 'links.home', url: '/' },
  { name: 'links.news', url: '/news' },
  { name: 'links.about', url: '/about' },
)

const { locales, setLocale, locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  locales.value.filter(i => i.code),
)
</script>

<template>
  <header
    class="relative grid grid-cols-[1fr_auto_1fr] h-12 items-center b-1 border-b-dark-4/10 b-solid b-l-none b-r-none b-t-none bg-element-light/80 p-2 text-black backdrop-blur-md dark:(border-b-dark-2/30 bg-element-dark/80 text-white) 2xl:px-40 md:px-6 xl:px-25"
  >
    <!-- Левая часть -->
    <div class="flex items-center">
      <NuxtLinkLocale to="/" class="text-inherit">
        <AppLogo class="h-8 max-w-[150px] flex" />
      </NuxtLinkLocale>
    </div>

    <!-- Центр -->
    <nav class="hidden items-center justify-center md:flex space-x-8">
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

    <!-- Правая часть -->
    <div class="hidden items-center justify-end gap-2 md:flex space-x-2" role="group">
      <UiColorSwitch />

      <!-- Языки -->
      <div
        class="inline-flex gap-1 overflow-hidden rounded-full p-1 core-border core-ui"
        role="navigation"
      >
        <NuxtLink
          v-for="localeOption in availableLocales"
          :key="localeOption.code"
          :aria-label="t('app.langSelect') + localeOption.name"
          :to="switchLocalePath(localeOption.code)"
          class="rounded-full px-3 py-1 text-center text-sm font-medium decoration-none transition-colors duration-200 hover:bg-gray200 dark:hover:bg-dark-600"
          :class="[
            locale === localeOption.code
              ? 'bg-black text-white pointer-events-none dark:(bg-white text-black)'
              : 'text-black dark:text-inherit',
          ]"
          @click.prevent.capture="setLocale(localeOption.code)"
        >
          {{ localeOption.code }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
