export const zodiac = {
  aries: ['Áries', '♈'], taurus: ['Touro', '♉'], gemini: ['Gêmeos', '♊'],
  cancer: ['Câncer', '♋'], leo: ['Leão', '♌'], virgo: ['Virgem', '♍'],
  libra: ['Libra', '♎'], scorpio: ['Escorpião', '♏'], sagittarius: ['Sagitário', '♐'],
  capricorn: ['Capricórnio', '♑'], aquarius: ['Aquário', '♒'], pisces: ['Peixes', '♓'],
} as const

export type ZodiacSign = keyof typeof zodiac
export const topics = {
  overview: 'Previsão geral',
  love: 'Amor',
  career: 'Trabalho e carreira',
  finance: 'Finanças',
  health: 'Saúde e bem-estar',
  advice: 'Conselho do dia',
} as const
type Topic = keyof typeof topics
export const topicKeys = Object.keys(topics) as Topic[]

export type DailyForecast = {
  date: string
  language: string
  textDate: string
  textLanguage: string
  sections: Partial<Record<Topic, string>>
  horoscope?: string
  disclaimer?: string
  footer: string
}

export class HoroscopeRateLimit extends Error {
  readonly retryAt: number

  constructor(retryAt: number) {
    super('Limite de consultas da AstroWay atingido.')
    this.retryAt = retryAt
  }
}

const cache = new Map<ZodiacSign, DailyForecast>()
const pending = new Map<string, Promise<DailyForecast>>()
const endpoint = 'https://api.astroway.info/v1/public/horoscope/daily'
let cacheDate = ''
let retryAt = 0

function record(value: unknown): Record<string, unknown> | undefined {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : undefined
}

function nonempty(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function parseForecast(payload: unknown, sign: ZodiacSign, date: string): DailyForecast {
  const response = record(payload)
  const data = record(response?.data)
  const language = nonempty(data?.language)
  const footer = nonempty(response?._footer)

  if (response?.ok !== true || data?.sign !== sign || data.date !== date ||
      data.period !== 'daily' || !language || !footer) {
    throw new Error('Resposta inesperada da AstroWay.')
  }

  const rawSections = record(data.sections)
  const sections: DailyForecast['sections'] = {}
  for (const topic of topicKeys) {
    const text = nonempty(rawSections?.[topic])
    if (text) sections[topic] = text
  }

  const horoscope = nonempty(data.horoscope)
  if (!Object.keys(sections).length && !horoscope) throw new Error('Previsão sem texto.')
  const fallback = record(data.fallback)
  return {
    date, language, sections, horoscope, footer,
    disclaimer: nonempty(data.disclaimer),
    textDate: nonempty(fallback?.textDate) ?? date,
    textLanguage: nonempty(fallback?.textLanguage) ?? language,
  }
}

function getRetryTime(headers: Headers) {
  const retry = headers.get('Retry-After')
  const epoch = Number(headers.get('X-RateLimit-Reset')) * 1000
  const retryTime = retry === null ? 0 : /^\d+$/.test(retry)
    ? Date.now() + Number(retry) * 1000 : Date.parse(retry)
  return Math.max(Date.now() + 1000, retryTime || epoch || Date.now() + 60 * 60 * 1000)
}

export async function getDailyForecast(sign: ZodiacSign): Promise<DailyForecast> {
  const date = new Date().toISOString().slice(0, 10)
  if (cacheDate !== date) {
    cache.clear()
    cacheDate = date
  }

  const cached = cache.get(sign)
  if (cached) return cached
  const key = date + '/' + sign
  const existing = pending.get(key)
  if (existing) return existing
  if (Date.now() < retryAt) throw new HoroscopeRateLimit(retryAt)

  const url = new URL(endpoint)
  url.search = new URLSearchParams({ sign, date, lang: 'pt' }).toString()

  const request = (async () => {
    const response = await fetch(url, { credentials: 'omit', signal: AbortSignal.timeout(22000) })
    if (response.status === 429) {
      retryAt = getRetryTime(response.headers)
      throw new HoroscopeRateLimit(retryAt)
    }
    if (!response.ok) throw new Error('Falha na consulta da AstroWay.')
    const forecast = parseForecast(await response.json(), sign, date)
    if (cacheDate === date && forecast.textDate === date && forecast.textLanguage === 'pt') {
      cache.set(sign, forecast)
    }
    return forecast
  })().finally(() => pending.delete(key))

  pending.set(key, request)
  return request
}
