import React from 'react'

type Props = { html: string }

export default function Preview({ html }: Props) {
  return (
    <div
      className="preview"
      aria-label="Aperçu Markdown"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
