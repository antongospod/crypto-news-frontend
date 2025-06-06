export function useFormatDate(string: string) {
  const { locale } = useI18n()
  const options: object = { day: 'numeric', month: 'short', year: 'numeric' }

  return new Date(string).toLocaleDateString(locale.value, options)
}
