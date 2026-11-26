import { useEffect, useRef, useState } from 'react'
import './ResumeScroll.css'

const resumeFilename = 'Desenvolvedor Junior - Kettlem Drobinheski.pdf'
const resumeUrl = `${import.meta.env.BASE_URL}curriculo/${encodeURIComponent(resumeFilename)}`

export function ResumeScroll() {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const paper = useRef<HTMLDivElement>(null)
  const closingTimer = useRef<number | null>(null)
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [pdfStatus, setPdfStatus] = useState<'checking' | 'available' | 'unavailable'>('checking')
  const [preview, setPreview] = useState(false)
  const available = pdfStatus === 'available'
  const canPreview = available && navigator.pdfViewerEnabled !== false

  useEffect(() => {
    const timer = closingTimer
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const controller = new AbortController()

    // Vite can return the app's HTML for a missing path, even with HTTP 200.
    void fetch(resumeUrl, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        if (controller.signal.aborted) return
        const type = response.headers.get('content-type')?.split(';')[0].trim()
        setPdfStatus(response.ok && type === 'application/pdf' ? 'available' : 'unavailable')
      })
      .catch(() => {
        if (!controller.signal.aborted) setPdfStatus('unavailable')
      })

    return () => controller.abort()
  }, [open])

  function openScroll() {
    const element = dialog.current
    if (!element || element.open) return

    setPdfStatus('checking')
    setPreview(false)
    element.showModal()
    if (paper.current) paper.current.scrollTop = 0
    setOpen(true)
    closeButton.current?.focus({ preventScroll: true })
  }

  function finishClosing() {
    if (closingTimer.current !== null) window.clearTimeout(closingTimer.current)
    closingTimer.current = null
    dialog.current?.close()
    setOpen(false)
    setClosing(false)
    setPreview(false)
    trigger.current?.focus({ preventScroll: true })
  }

  function closeScroll() {
    if (!dialog.current?.open || closingTimer.current !== null) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClosing()
      return
    }

    setClosing(true)
    closingTimer.current = window.setTimeout(finishClosing, 380)
  }

  return (
    <>
      <button ref={trigger} className="resume-preview resume-trigger" type="button"
        aria-haspopup="dialog" aria-controls="resume-scroll" onClick={openScroll}>
        Currículo
      </button>
      <dialog ref={dialog} id="resume-scroll" className="resume-dialog" data-closing={closing}
        aria-labelledby="resume-title" aria-describedby="resume-description"
        onCancel={(event) => {
          event.preventDefault()
          closeScroll()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeScroll()
        }}>
        <div className="resume-scroll" onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return
          if (closing && event.animationName === 'resume-rollup') finishClosing()
        }}>
          <div ref={paper} className="resume-scroll__paper" role="region" aria-labelledby="resume-title" tabIndex={0}>
            <button ref={closeButton} className="resume-scroll__close" type="button"
              aria-label="Fechar pergaminho" onClick={closeScroll}>×</button>
            <div className="resume-scroll__emblem" aria-hidden="true">✧ ☾ ✧</div>
            <h2 id="resume-title">Currículo Profissional</h2>
            <p id="resume-description">Conheça minha trajetória, formação, experiências e habilidades em desenvolvimento de software.</p>
            <div className="resume-scroll__rule" aria-hidden="true" />
            <div className="resume-scroll__actions">
              <button type="button" className="resume-scroll__action" disabled={!canPreview}
                aria-expanded={preview} aria-controls="resume-pdf-preview" onClick={() => setPreview((visible) => !visible)}>
                {preview ? 'Ocultar PDF' : 'Visualizar PDF'}
              </button>
              {available ? (
                <a className="resume-scroll__action resume-scroll__action--download" href={resumeUrl} download={resumeFilename}>
                  Baixar Currículo
                </a>
              ) : (
                <button className="resume-scroll__action resume-scroll__action--download" type="button" disabled>
                  Baixar Currículo
                </button>
              )}
            </div>
            <p className="resume-scroll__notice" role="status">
              {pdfStatus === 'checking' && 'Verificando a disponibilidade do PDF…'}
              {pdfStatus === 'unavailable' && 'O currículo em PDF ainda não está disponível.'}
              {available && !canPreview && 'A visualização de PDF não está disponível neste navegador. Use a opção de download.'}
            </p>
            <div id="resume-pdf-preview" hidden={!preview}>
              {preview && <iframe title="Currículo profissional em PDF" src={resumeUrl} />}
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
