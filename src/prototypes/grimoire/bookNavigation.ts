export const pageTitles = [
  'Bem-vindo ao meu grimório.',
  'Sobre Mim',
  'Minhas Habilidades',
  'Meus Projetos',
  'Contato',
] as const

type Direction = -1 | 1

export type BookState =
  | { phase: 'closed' | 'opening' | 'open' | 'closing'; page: number }
  | { phase: 'turning'; page: number; direction: Direction; returning: boolean }

export type BookAction =
  | { type: 'open' | 'close'; instant: boolean }
  | { type: 'turn'; direction: Direction; instant: boolean }
  | { type: 'settled' }

export const initialBook: BookState = { phase: 'closed', page: 0 }

export function navigateBook(state: BookState, action: BookAction): BookState {
  switch (action.type) {
    case 'open':
      if (state.phase !== 'closed') return state
      return { phase: action.instant ? 'open' : 'opening', page: 0 }
    case 'close':
      if (state.phase !== 'open') return state
      if (action.instant) return initialBook
      if (state.page === 0) return { phase: 'closing', page: 0 }
      return { phase: 'turning', page: state.page, direction: -1, returning: true }
    case 'turn': {
      const page = state.page + action.direction
      if (state.phase !== 'open' || page < 0 || page >= pageTitles.length) return state
      if (action.instant) return { phase: 'open', page }
      return { phase: 'turning', page: state.page, direction: action.direction, returning: false }
    }
    case 'settled': {
      if (state.phase === 'opening') return { phase: 'open', page: 0 }
      if (state.phase === 'closing') return initialBook
      if (state.phase !== 'turning') return state
      const page = state.page + state.direction
      if (!state.returning) return { phase: 'open', page }
      if (page === 0) return { phase: 'closing', page }
      return { ...state, page }
    }
  }
}
