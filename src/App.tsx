import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { DEFAULT_MD, renderMarkdown } from './lib/md'
import { downloadMarkdown, suggestFilename } from './lib/filename'

export default function App() {
  const [text, setText] = useState<string>(() => localStorage.getItem('md:text') || DEFAULT_MD)
  const [name, setName] = useState<string>(() => localStorage.getItem('md:name') || '')

  useEffect(() => {
    localStorage.setItem('md:text', text)
  }, [text])

  useEffect(() => {
    localStorage.setItem('md:name', name)
  }, [name])

  const html = useMemo(() => renderMarkdown(text), [text])
  const filename = useMemo(() => suggestFilename(text, name), [text, name])

  const onDownload = () => {
    downloadMarkdown(text, filename)
  }

  const onClear = () => setText('')

  return (
    <div className="container">
      <header className="header">
        <div>
          <div className="brand">Markdown Web</div>
          <div className="small">Édite → Prévisualise → Télécharge en .md</div>
        </div>
        <div className="toolbar">
          <input
            type="text"
            placeholder="Nom du fichier (optionnel)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Nom du fichier"
          />
          <button onClick={onDownload} aria-label="Télécharger .md">Télécharger .md</button>
          <button className="secondary" onClick={onClear}>Vider</button>
        </div>
      </header>

      <div className="row">
        <section className="panel">
          <h2>Éditeur</h2>
          <div className="editor">
            <Editor value={text} onChange={setText} />
          </div>
        </section>

        <section className="panel">
          <h2>Aperçu</h2>
          <Preview html={html} />
        </section>
      </div>

      <footer className="small" style={{marginTop:'.8rem'}}>
        Fichier proposé : <code>{filename}</code>
      </footer>
    </div>
  )
}
