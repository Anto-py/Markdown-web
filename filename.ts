function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_ ]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export function suggestFilename(text: string, explicit?: string): string {
  if (explicit?.trim()) {
    return slugify(explicit) + '.md'
  }
  // 1) Try first Markdown heading
  const match = text.match(/^\s*#\s+(.+)$/m)
  if (match?.[1]) {
    return slugify(match[1]) + '.md'
  }
  // 2) Fallback to first 6 words
  const words = text.replace(/\s+/g, ' ').trim().split(' ').slice(0, 6).join(' ')
  if (words) return slugify(words) + '.md'
  // 3) Datetime fallback
  const now = new Date()
  const stamp = now.toISOString().replace(/[:T]/g, '-').slice(0, 16)
  return `document-${stamp}.md`
}

export function downloadMarkdown(rawText: string, filename: string) {
  // UTF-8 without BOM for portability
  const blob = new Blob([rawText], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
