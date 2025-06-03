export function useLangMeta(
  i18nKey: string,
  seoImage: string,
  format: 'prefix' | 'suffix' = 'suffix',
) {
  const { t } = useI18n()
  const { siteTitle } = useRuntimeConfig().public

  const seoTitle = computed(() => t(`${i18nKey}.title`))
  const seoDesc = computed(() => t(`${i18nKey}.description`))

  const formatTitle = format === 'prefix' ? `${siteTitle} - %s` : `%s - ${siteTitle}`
  const formatSeoTitle = `${formatTitle.replace('%s', seoTitle.value)}`

  useSeoMeta({
    title: seoTitle,
    description: seoDesc,
    ogTitle: formatSeoTitle,
    ogDescription: seoDesc,
    twitterDescription: seoDesc,
    twitterTitle: formatSeoTitle,
    twitterImage: seoImage,
    ogImage: seoImage,
    titleTemplate: formatTitle,
    ogType: 'website',
  })
}
