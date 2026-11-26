import { Music2, Pause, Play, SkipBack, SkipForward, Volume2, X } from 'lucide-react'
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import musicMedallion from '../assets/music-medallion.jpg'
import './MysticMusicPlayer.css'

const tracks = [
  { title: 'Fantasy Ambient', artist: 'The Mountain', file: 'fantasy-ambient.mp3' },
  { title: 'In the Merry Month of May', artist: 'Kaazoom', file: 'merry-month-of-may.mp3' },
  { title: 'Medieval Happy Music', artist: 'TuneTank', file: 'medieval-happy-music.mp3' },
  { title: 'Medieval Folk Music', artist: 'Watermelon Beats', file: 'medieval-folk-music.mp3' },
  { title: 'Magic Fantasy Fairy Tale Music', artist: 'Andriih', file: 'magic-fairy-tale.mp3' },
]

export function MysticMusicPlayer({ ref }: { ref?: Ref<{ playOpeningTrack: () => void }> }) {
  const player = useRef<HTMLAudioElement>(null)
  const playRequest = useRef(0)
  const container = useRef<HTMLElement>(null)
  const disclosure = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [volume, setVolume] = useState(20)
  const [playing, setPlaying] = useState(false)
  const [needsActivation, setNeedsActivation] = useState(false)
  const [error, setError] = useState('')
  const track = tracks[trackIndex]

  useEffect(() => {
    const audio = player.current
    const requests = playRequest
    return () => {
      requests.current++
      audio?.pause()
    }
  }, [])

  useEffect(() => {
    if (!open) return

    function closeOnOutsideClick(event: MouseEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('click', closeOnOutsideClick)
    return () => document.removeEventListener('click', closeOnOutsideClick)
  }, [open])

  function play(audio: HTMLAudioElement) {
    const request = ++playRequest.current
    setError('')
    audio.volume = volume / 100
    void audio.play().then(() => {
      if (request === playRequest.current) setNeedsActivation(false)
    }).catch((failure: unknown) => {
      if (request !== playRequest.current) return

      setPlaying(false)
      const reason = failure instanceof DOMException ? failure.name : undefined
      if (reason === 'NotAllowedError') {
        setNeedsActivation(true)
        return
      }

      setNeedsActivation(false)
      console.warn('Alchemy Music: falha de reprodução', {
        source: audio.currentSrc || audio.src,
        reason,
        mediaError: audio.error?.code,
        failure,
      })
      setError('Não foi possível reproduzir esta faixa. Tente novamente ou avance para a próxima.')
    })
  }

  function selectTrack(index: number, resume: boolean) {
    const audio = player.current
    if (!audio) return

    const next = (index + tracks.length) % tracks.length
    playRequest.current++
    setTrackIndex(next)
    setError('')
    setPlaying(false)
    if (!resume) {
      audio.removeAttribute('src')
      audio.load()
      return
    }
    audio.src = `${import.meta.env.BASE_URL}audio/${tracks[next].file}`
    play(audio)
  }

  useImperativeHandle(ref, () => ({
    playOpeningTrack: () => selectTrack(0, true),
  }))

  function togglePlayback() {
    const audio = player.current
    if (!audio) return

    if (!audio.paused) {
      playRequest.current++
      audio.pause()
      return
    }

    if (!audio.hasAttribute('src') || audio.error) selectTrack(trackIndex, true)
    else play(audio)
  }

  function closePanel() {
    setOpen(false)
    disclosure.current?.focus()
  }

  return (
    <section ref={container} className="mystic-music" aria-label="Trilha sonora do Alchemy" data-playing={playing} data-needs-activation={needsActivation}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open && disclosure.current?.getClientRects().length) {
          event.stopPropagation()
          closePanel()
        }
      }}>
      <div className="mystic-music-compact">
        <button ref={disclosure} className="mystic-music-medallion" type="button" aria-label={open ? 'Fechar controles musicais' : 'Abrir controles musicais'}
          aria-expanded={open} aria-controls="alchemy-music-controls" onClick={() => setOpen((wasOpen) => !wasOpen)}>
          <img src={musicMedallion} alt="" width={192} height={192} />
        </button>
      </div>
      <div id="alchemy-music-controls" className="mystic-music-panel" data-open={open}>
        <button className="mystic-music-close" type="button" aria-label="Fechar controles musicais" onClick={closePanel}>
          <X size={18} aria-hidden="true" />
        </button>
        <Music2 className="mystic-music-symbol" size={20} aria-hidden="true" />
        <div className="mystic-music-track">
          <span className="mystic-music-name">Alchemy Music</span>
          <div aria-live="polite" aria-atomic="true">
            <strong title={`${track.title} · ${track.artist}`}>{track.title}</strong>
            <small>Música {trackIndex + 1} de {tracks.length}</small>
          </div>
        </div>
        <div className="mystic-music-controls">
          <button type="button" aria-label="Faixa anterior" onClick={() => selectTrack(trackIndex - 1, player.current?.paused === false)}>
            <SkipBack size={18} aria-hidden="true" />
          </button>
          <button className="mystic-music-play" type="button" aria-label={playing ? 'Pausar trilha' : 'Reproduzir trilha'} onClick={togglePlayback}>
            {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
          </button>
          <button type="button" aria-label="Próxima faixa" onClick={() => selectTrack(trackIndex + 1, player.current?.paused === false)}>
            <SkipForward size={18} aria-hidden="true" />
          </button>
        </div>
        <label className="mystic-music-volume">
          <Volume2 size={18} aria-hidden="true" />
          <input type="range" aria-label="Volume da trilha" aria-valuetext={`${volume}%`} min="0" max="100" value={volume}
            onChange={(event) => {
              const nextVolume = Number(event.currentTarget.value)
              setVolume(nextVolume)
              if (player.current) player.current.volume = nextVolume / 100
            }} />
        </label>
        {error && <p className="mystic-music-error" role="status">{error}</p>}
      </div>
      {needsActivation && (
        <button className="mystic-music-activate" type="button" onClick={togglePlayback}>
          <Music2 size={16} aria-hidden="true" />
          Ativar magia sonora
        </button>
      )}
      <audio ref={player} preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => selectTrack(trackIndex + 1, true)}
          onError={() => {
            setPlaying(false)
            setNeedsActivation(false)
            setError('Esta faixa está indisponível. Tente novamente ou avance para a próxima.')
          }} />
    </section>
  )
}
