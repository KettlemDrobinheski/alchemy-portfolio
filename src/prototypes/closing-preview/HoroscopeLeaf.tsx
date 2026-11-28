import { Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getDailyForecast, HoroscopeRateLimit, topicKeys, topics, zodiac, type DailyForecast, type ZodiacSign } from './astroway'
import './horoscope.css'

type ForecastState =
  | { status: 'loading' }
  | { status: 'success'; forecast: DailyForecast }
  | { status: 'error' }
  | { status: 'rate-limit'; retryAt: number }

function formatDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.split('-').reverse().join('/') : date
}

export function HoroscopeLeaf({ sign, onClose }: { sign: ZodiacSign; onClose: () => void }) {
  const [state, setState] = useState<ForecastState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [name, symbol] = zodiac[sign]

  useEffect(() => {
    let active = true
    void getDailyForecast(sign).then(
      (forecast) => { if (active) setState({ status: 'success', forecast }) },
      (error: unknown) => {
        if (!active) return
        setState(error instanceof HoroscopeRateLimit
          ? { status: 'rate-limit', retryAt: error.retryAt }
          : { status: 'error' })
      },
    )
    return () => { active = false }
  }, [sign, attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }

  return (
    <section className="lab-horoscope" aria-labelledby="lab-horoscope-title">
      <header>
        <h2 id="lab-horoscope-title"><span aria-hidden="true">{symbol}{'\uFE0E'}</span> {name}</h2>
        <button type="button" onClick={onClose} aria-label="Fechar previsão"><X size={16} aria-hidden="true" /></button>
      </header>
      <div className="lab-horoscope-reading" tabIndex={0} role="region" aria-label="Previsão diária"
        aria-busy={state.status === 'loading'}>
        {state.status === 'loading' && (
          <p className="lab-horoscope-loading" role="status"><Sparkles aria-hidden="true" /> Consultando os astros…</p>
        )}
        {state.status === 'error' && (
          <div role="status"><p>A previsão está indisponível no momento.</p><button type="button" onClick={retry}>Tentar novamente</button></div>
        )}
        {state.status === 'rate-limit' && (
          <p role="status">O limite de consultas da AstroWay foi atingido. Tente novamente a partir de{' '}
            <time dateTime={new Date(state.retryAt).toISOString()}>{new Date(state.retryAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</time>.
          </p>
        )}
        {state.status === 'success' && (() => {
          const { forecast } = state
          return (
            <div className="lab-horoscope-result">
              <p><time dateTime={forecast.date}>{formatDate(forecast.date)}</time></p>
              {(forecast.textDate !== forecast.date || forecast.textLanguage !== 'pt') && (
                <p>Texto alternativo da AstroWay de {formatDate(forecast.textDate)} ({forecast.textLanguage}).</p>
              )}
              <div lang={forecast.textLanguage}>
                {topicKeys.map((topic) => forecast.sections[topic] && (
                  <section key={topic}><h3>{topics[topic]}</h3><p>{forecast.sections[topic]}</p></section>
                ))}
                {!Object.keys(forecast.sections).length && <p className="lab-horoscope-plain">{forecast.horoscope}</p>}
              </div>
              <footer>
                <p>Entretenimento astrológico.</p>
                {forecast.disclaimer && <p lang={forecast.language}>{forecast.disclaimer}</p>}
                <a href="https://api.astroway.info/" target="_blank" rel="noreferrer">{forecast.footer}</a>
              </footer>
            </div>
          )
        })()}
      </div>
    </section>
  )
}
