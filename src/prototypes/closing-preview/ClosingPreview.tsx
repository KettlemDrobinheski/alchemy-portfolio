import { useLayoutEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { HoroscopeLeaf } from './HoroscopeLeaf'
import { zodiac, type ZodiacSign } from './astroway'
import { CreationBook } from '../../components/closing/CreationBook'
import { ForestArrival } from '../../components/closing/ForestArrival'

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}

function isForest() {
  return window.location.hash === '#/floresta-encantada'
}

export function ClosingPreview() {
  const forest = useSyncExternalStore(subscribe, isForest)
  const content = useRef<HTMLElement>(null)
  const [selection, setSelection] = useState<{
    sign: ZodiacSign
    dialog: HTMLDialogElement
    button: HTMLButtonElement
  } | null>(null)

  function readSign(event: MouseEvent<HTMLElement>) {
    if (!(event.target instanceof Element)) return
    const button = event.target.closest<HTMLButtonElement>('button.secret-sign')
    const dialog = button?.closest<HTMLDialogElement>('dialog.secret-grimoire')
    if (!button || !dialog || button.disabled) return

    const sign = (Object.keys(zodiac) as ZodiacSign[]).find(
      (key) => zodiac[key][0] === button.textContent?.trim(),
    )
    if (!sign) return
    setSelection(button.getAttribute('aria-pressed') === 'true' ? null : { sign, dialog, button })
  }

  function dismissForecast() {
    if (!selection) return
    selection.button.click()
    selection.button.focus({ preventScroll: true })
    setSelection(null)
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    content.current?.focus({ preventScroll: true })
  }, [forest])

  useLayoutEffect(() => {
    const dialog = selection?.dialog
    if (!dialog) return
    const clear = () => setSelection((current) => current?.dialog === dialog ? null : current)
    dialog.addEventListener('close', clear)
    return () => dialog.removeEventListener('close', clear)
  }, [selection?.dialog])

  return (
    <main className="closing-preview" ref={content} tabIndex={-1} onClickCapture={readSign}>
      {forest ? (
        <>
          <a className="closing-preview-back" href="#livro">Voltar ao Último Capítulo</a>
          <ForestArrival onReturnToEntrance={() => {}} />
        </>
      ) : (
        <>
          <CreationBook />
          {selection?.dialog.isConnected && createPortal(
            <HoroscopeLeaf key={selection.sign} sign={selection.sign} onClose={dismissForecast} />,
            selection.dialog,
          )}
        </>
      )}
    </main>
  )
}
