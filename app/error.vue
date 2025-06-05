<script setup lang="ts">
const props = defineProps<{
  error: { statusCode?: number }
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const isNotFound = computed(() => props.error?.statusCode === 404)

const title = computed(() =>
  isNotFound.value ? t('error.404.title') : t('error.500.title'),
)
const description = computed(() =>
  isNotFound.value ? t('error.404.desc') : t('error.500.desc'),
)

useHead({
  title: title.value,
  meta: [{ name: 'robots', content: 'noindex' }],
})

const handleError = () => clearError({ redirect: localePath('/') })

function handleGoBack() {
  if (window.history.length > 1)
    window.history.back()
  else handleError()
}
</script>

<template>
  <Body class="m0 font-mono core-theme">
    <client-only v-if="props.error">
      <section class="h-screen flex items-center justify-center">
        <main
          class="flex flex-col items-center text-center"
          role="main"
          aria-live="polite"
        >
          <header>
            <UiScrollAnimation
              element="h1"
              animation="zoom-in"
              :duration="1200"
              class="m-0 text-9xl font-bold"
            >
              {{ props.error.statusCode }}
            </UiScrollAnimation>
            <UiScrollAnimation
              element="h2"
              animation="fade-up"
              :delay="300"
              :duration="1200"
              class="mt-10 font-normal"
            >
              {{ title }}
            </UiScrollAnimation>
          </header>

          <UiScrollAnimation
            element="p"
            animation="fade-up"
            :delay="600"
            :duration="1200"
            class="my-4 text-lg"
          >
            {{ description }}
          </UiScrollAnimation>

          <UiScrollAnimation
            element="button"
            animation="fade-up"
            :delay="1200"
            :duration="1200"
            class="mt-6 cursor-pointer rounded-sm px-6 py-2 text-sm font-bold core-border hover:core-theme"
            @click="handleGoBack"
          >
            {{ t('error.return') }}
          </UiScrollAnimation>
        </main>
      </section>
    </client-only>
  </Body>
</template>
