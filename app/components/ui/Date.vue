<script setup lang="ts">
import { computed } from 'vue'

const { date } = defineProps<{
  date: string
}>()

const { locale } = useI18n()

const normalizedDate = computed(() => {
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    const [day, month, year] = date.split('.')
    return `${year}-${month}-${day}`
  }
  return date
})
</script>

<template>
  <NuxtTime :datetime="normalizedDate" month="long" day="numeric" year="numeric" :locale="locale">
    {{ useFormatDate(normalizedDate) }}
  </NuxtTime>
</template>
