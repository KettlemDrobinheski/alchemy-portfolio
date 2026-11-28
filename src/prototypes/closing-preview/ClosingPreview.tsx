import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
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
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    content.current?.focus({ preventScroll: true })
  }, [forest])

  return (
    <main className="closing-preview" ref={content} tabIndex={-1}>
      {forest ? (
        <>
          <a className="closing-preview-back" href="#livro">Voltar ao Último Capítulo</a>
          <ForestArrival onReturnToEntrance={() => {}} />
        </>
      ) : <CreationBook />}
    </main>
  )
}
