import { Briefcase, Coins, Heart, Leaf, Sparkles, Sun, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { getDailyForecast, HoroscopeRateLimit, topicKeys, topics, zodiac, type DailyForecast, type ZodiacSign } from './astroway'
import './horoscope.css'

type ForecastState =
  | { status: 'success'; forecast: DailyForecast }
  | { status: 'error' }
  | { status: 'rate-limit'; retryAt: number }

const topicIcons = {
  overview: Sun,
  love: Heart,
  career: Briefcase,
  finance: Coins,
  health: Leaf,
  advice: Sparkles,
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' })

function formatDate(date: string) {
  const instant = new Date(date + 'T00:00:00Z')
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(instant.getTime())
    ? dateFormatter.format(instant)
    : date
}
export function HoroscopeLeaf({ sign, onClose, symbolRef, ornament }: {
  sign: ZodiacSign
  onClose: () => void
  symbolRef?: Ref<HTMLSpanElement>
  ornament?: ReactNode
}) {
  const [result, setResult] = useState<{ sign: ZodiacSign; attempt: number; state: ForecastState } | null>(null)
  const [attempt, setAttempt] = useState(0)
  const reader = useRef<HTMLDivElement>(null)
  const [name, symbol] = zodiac[sign]

  useLayoutEffect(() => {
    if (reader.current) reader.current.scrollTop = 0
  }, [sign])

  useEffect(() => {
    let active = true
    void getDailyForecast(sign).then(
      (forecast) => {
        if (active) setResult({ sign, attempt, state: { status: 'success', forecast } })
      },
      (error: unknown) => {
        if (!active) return
        const state: ForecastState = error instanceof HoroscopeRateLimit
          ? { status: 'rate-limit', retryAt: error.retryAt }
          : { status: 'error' }
        setResult({ sign, attempt, state })
      },
    )
    return () => { active = false }
  }, [sign, attempt])

  function retry() {
    setAttempt((value) => value + 1)
  }

  const state = result?.sign === sign && result.attempt === attempt ? result.state : null
  const forecast = state?.status === 'success' ? state.forecast : null

  return (
    <section className="lab-horoscope" aria-labelledby="lab-horoscope-title">
      {ornament}
      <header className="lab-horoscope-header">
        <span className="lab-horoscope-symbol" ref={symbolRef} aria-hidden="true">{symbol}{'\uFE0E'}</span>
        <div>
          <h2 id="lab-horoscope-title">{name}</h2>
          <p>Previsão do Grimório</p>
          {forecast && <time dateTime={forecast.textDate}>{formatDate(forecast.textDate)}</time>}
        </div>
        <button className="lab-horoscope-close" type="button" onClick={onClose} aria-label="Fechar previsão">
          <X size={23} aria-hidden="true" />
        </button>
      </header>
      <div className="lab-horoscope-reading" ref={reader} tabIndex={0} role="region" aria-label="Previsão diária"
        aria-busy={!state}>
        {!state && (
          <p className="lab-horoscope-loading" role="status"><Sparkles aria-hidden="true" /> Consultando os astros…</p>
        )}
        {state?.status === 'error' && (
          <div role="status"><p>A previsão está indisponível no momento.</p><button type="button" onClick={retry}>Tentar novamente</button></div>
        )}
        {state?.status === 'rate-limit' && (
          <p role="status">O limite de consultas da AstroWay foi atingido. Tente novamente a partir de{' '}
            <time dateTime={new Date(state.retryAt).toISOString()}>{new Date(state.retryAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</time>.
          </p>
        )}
        {forecast && (
          <div className="lab-horoscope-result">
            {(forecast.textDate !== forecast.date || forecast.textLanguage !== 'pt') && (
              <p className="lab-horoscope-notice">
                Texto alternativo da AstroWay de {formatDate(forecast.textDate)} ({forecast.textLanguage}).
                {forecast.textDate !== forecast.date && <> Data solicitada: {formatDate(forecast.date)}.</>}
              </p>
            )}
            {topicKeys.map((topic) => {
              const text = forecast.sections[topic]
              if (!text) return null
              const Icon = topicIcons[topic]
              return (
                <section className="lab-horoscope-topic" key={topic}>
                  <span className="lab-horoscope-icon"><Icon size={19} aria-hidden="true" /></span>
                  <div><h3>{topics[topic]}</h3><p lang={forecast.textLanguage}>{text}</p></div>
                </section>
              )
            })}
            {!Object.keys(forecast.sections).length && <p lang={forecast.textLanguage}>{forecast.horoscope}</p>}
            <footer>
              <p>Entretenimento astrológico.</p>
              {forecast.disclaimer && <p lang={forecast.language}>{forecast.disclaimer}</p>}
              <a href="https://api.astroway.info/" target="_blank" rel="noreferrer">{forecast.footer}</a>
            </footer>
          </div>
        )}
      </div>
    </section>
  )
}
