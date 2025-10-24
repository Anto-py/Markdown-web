import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  gfm: true,
  breaks: false
})

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md) as string
  // Sanitize HTML to avoid XSS
  return DOMPurify.sanitize(raw)
}

export const DEFAULT_MD = `# Nouveau document

Écris ton *Markdown* ici.

- Liste
- **Gras**
- \`code\`

> Astuce: le bouton "Télécharger .md" exporte exactement le texte de gauche.`
