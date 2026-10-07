// "2026-05-08" → "2026-05-08", the one date format nobody misreads
export function isoDate(value: string | Date) {
  return new Date(value).toISOString().slice(0, 10)
}

// Walks the minimark body Nuxt Content stores: [tag, props, ...children]
export function countWords(body: unknown): number {
  const walk = (node: unknown): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.slice(2).map(walk).join(' ')
    return ''
  }
  const value = (body as { value?: unknown[] } | undefined)?.value ?? []
  return value.map(walk).join(' ').split(/\s+/).filter(Boolean).length
}

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 230))
}
