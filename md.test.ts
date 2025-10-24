import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '../lib/md'

describe('renderMarkdown', () => {
  it('renders headings and lists', () => {
    const html = renderMarkdown('# Titre\n\n- a\n- b')
    expect(html).toContain('<h1')
    expect(html).toContain('<li>')
  })

  it('sanitizes scripts', () => {
    const html = renderMarkdown('Hello<script>alert(1)</script>')
    expect(html).toContain('Hello')
    expect(html).not.toContain('<script>')
  })
})
