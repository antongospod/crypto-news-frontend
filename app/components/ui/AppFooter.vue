<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <footer
    class="justify-center border-t-1 border-t-dark-4/10 border-solid border-b-none border-l-none border-r-none bg-inherit px-6 py-6 text-inherit dark:border-t-dark-2/30 lg:px30 md:px-15 xl:px40"
  >
    <div class="flex flex-col items-center justify-between text-xs text-dark-200 md:flex-row dark:text-gray-300" role="contentinfo">
      <p>{{ t('app.footer.copyright') }}</p>
      <p>{{ t('app.footer.version') }}: {{ $config.public.version }}</p>
    </div>
  </footer>
</template>
