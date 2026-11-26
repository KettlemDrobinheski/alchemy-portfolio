import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ProjectScreenshot } from '../data/projectDetails'
import './ProjectScreenshotGallery.css'

export function ProjectScreenshotGallery({ screenshots }: { screenshots: readonly ProjectScreenshot[] }) {
  const [selected, setSelected] = useState(0)
  const [originalSize, setOriginalSize] = useState(false)
  const viewer = useRef<HTMLDialogElement>(null)
  const imageArea = useRef<HTMLDivElement>(null)
  const enlargeButton = useRef<HTMLButtonElement>(null)
  const viewerTitle = useId()
  const screenshot = screenshots[selected]
  const last = screenshots.length - 1

  function move(step: number) {
    setSelected((index) => Math.max(0, Math.min(last, index + step)))
  }

  return (
    <div className="project-screenshot-gallery" onKeyDown={(event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        move(event.key === 'ArrowLeft' ? -1 : 1)
      }
    }}>
      <figure>
        <img className="project-screenshot-gallery__image" src={screenshot.src} alt={screenshot.alt}
          width={screenshot.width} height={screenshot.height} loading="lazy" decoding="async" />
        <figcaption aria-live="polite" aria-atomic="true">
          <span>{screenshot.title}</span>
          <span>{selected + 1} de {screenshots.length}</span>
        </figcaption>
      </figure>
      <div className="project-screenshot-gallery__controls">
        <button type="button" aria-disabled={selected === 0} onClick={() => move(-1)}>
          <ChevronLeft size={16} aria-hidden="true" /> Anterior
        </button>
        <button type="button" aria-disabled={selected === last} onClick={() => move(1)}>
          Próxima <ChevronRight size={16} aria-hidden="true" />
        </button>
        <button ref={enlargeButton} type="button" aria-haspopup="dialog" onClick={() => {
          setOriginalSize(false)
          viewer.current?.showModal()
        }}>
          <ZoomIn size={16} aria-hidden="true" /> Ampliar imagem
        </button>
      </div>
      {createPortal(
        <dialog ref={viewer} className="project-screenshot-viewer" aria-labelledby={viewerTitle}
          onCancel={(event) => {
            event.preventDefault()
            event.stopPropagation()
            event.currentTarget.close()
          }}
          onClose={(event) => {
            event.stopPropagation()
            enlargeButton.current?.focus({ preventScroll: true })
          }}
          onKeyDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation()
            if (event.target === event.currentTarget) event.currentTarget.close()
          }}>
          <div className="project-screenshot-viewer__panel">
            <header>
              <h3 id={viewerTitle}>{screenshot.title}</h3>
              <button type="button" onClick={() => viewer.current?.close()}>
                <X size={16} aria-hidden="true" /> Fechar ampliação
              </button>
              <button type="button" aria-pressed={originalSize} onClick={() => {
                imageArea.current?.scrollTo(0, 0)
                setOriginalSize((value) => !value)
              }}>
                Tamanho original
              </button>
            </header>
            <div ref={imageArea} className="project-screenshot-viewer__image-area" data-original={originalSize}
              tabIndex={originalSize ? 0 : undefined} role="region" aria-label="Área da captura ampliada">
              <img src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height}
                loading="lazy" decoding="async" />
            </div>
          </div>
        </dialog>,
        document.body,
      )}
    </div>
  )
}
