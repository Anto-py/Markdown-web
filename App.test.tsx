import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('updates preview on typing', () => {
    render(<App />)
    const editor = screen.getByLabelText('Éditeur Markdown') as HTMLTextAreaElement
    fireEvent.change(editor, { target: { value: '# Hello' } })
    const preview = screen.getByLabelText('Aperçu Markdown')
    expect(preview.innerHTML).toContain('<h1')
  })

  it('downloads with a filename', () => {
    // mock anchor and object url
    const urlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:fake')
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
    const appendSpy = vi.spyOn(document.body, 'appendChild')
    const removeSpy = vi.spyOn(document.body, 'removeChild' as any).mockImplementation(() => {})

    render(<App />)
    const btn = screen.getByLabelText('Télécharger .md')
    btn.click()

    expect(urlSpy).toHaveBeenCalledOnce()
    expect(appendSpy).toHaveBeenCalled()
    // cleanup mocks
    urlSpy.mockRestore()
    revokeSpy.mockRestore()
    appendSpy.mockRestore()
    removeSpy.mockRestore()
  })
})
