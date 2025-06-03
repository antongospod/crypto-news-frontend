<script setup lang="ts">
const props = defineProps({
  error: Object,
})

const { t } = useI18n()
const localePath = useLocalePath()
const handleError = () => clearError({ redirect: localePath('/') })

useHead({
  title: props.error?.statusCode === 404 ? t('error.404.title') : t('error.500.title'),
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})

const handleGoBack = () => window.history.length > 1 ? window.history.back() : handleError()
</script>

<template>
  <Body class="m0 font-mono core-theme">
    <client-only v-if="error?.statusCode === 404">
      <div class="m-0 h-screen flex items-center justify-center font-mono">
        <div class="flex flex-col items-center text-center" role="alert" aria-live="polite">
          <h1 class="m-0 text-9xl font-bold">
            404
          </h1>
          <h2 class="mt-10 font-normal">
            <template v-if="error?.statusCode === 404">
              {{ t('error.404.title') }}
            </template>
            <template v-else>
              {{ t('error.500.title') }}
            </template>
          </h2>
          <p class="text-lg">
            <template v-if="error?.statusCode === 404">
              {{ t('error.404.desc') }}
            </template>
            <template v-else>
              {{ t('error.500.desc') }}
            </template>
          </p>
          <button
            class="cursor-pointer rounded-sm px-6 py-2 text-sm font-bold core-border hover:core-theme"
            @click="handleGoBack"
          >
            {{ t('error.return') }}
          </button>
        </div>
      </div>
    </client-only>
  </Body>
</template>
