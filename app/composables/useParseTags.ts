export function useParseTags(raw: unknown, max = 3): string[] | string {
    let tags: string[] = []

    if (Array.isArray(raw)) {
        tags = raw.map(tag => String(tag).trim()).filter(Boolean)
    } else if (typeof raw === 'string') {
        tags = raw.split(',').map(tag => tag.trim()).filter(Boolean)
    }

    const sliced = tags.slice(0, max)

    return max === 1 ? (sliced[0] ?? '') : sliced
}