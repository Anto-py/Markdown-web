import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function Editor({ value, onChange, placeholder }: Props) {
  return (
    <textarea
      aria-label="Éditeur Markdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
    />
  )
}
