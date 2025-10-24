import { describe, it, expect, vi } from 'vitest'
import { suggestFilename } from '../lib/filename'

describe('suggestFilename', () => {
  it('uses explicit name when provided', () => {
    expect(suggestFilename('foo', 'Mon Document')).toBe('mon-document.md')
  })
  it('uses h1 heading when present', () => {
    expect(suggestFilename('# Titre Principal')).toBe('titre-principal.md')
  })
  it('falls back to words', () => {
    expect(suggestFilename('lorem ipsum dolor sit amet')).toBe('lorem-ipsum-dolor-sit-amet.md')
  })
  it('falls back to datetime when empty', () => {
    const name = suggestFilename('')
    expect(name.endsWith('.md')).toBe(true)
  })
})
