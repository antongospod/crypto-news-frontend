export function useParseTags(raw: unknown): string {
  if (Array.isArray(raw)) {
    return String(raw.find(Boolean)?.toString().trim() ?? '')
  }

  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map(tag => tag.trim())
      .find(Boolean) ?? ''
  }

  return ''
}
