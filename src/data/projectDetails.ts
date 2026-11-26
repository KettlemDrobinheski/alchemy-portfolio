import { PanelsTopLeft, type LucideIcon } from 'lucide-react'
import presentation from '../assets/projects/gessolider/01-apresentacao.png'
import dashboard from '../assets/projects/gessolider/02-dashboard.png'
import budgetCreation from '../assets/projects/gessolider/03-criacao-orcamento.png'
import materials from '../assets/projects/gessolider/04-calculo-materiais.png'
import budgetHistory from '../assets/projects/gessolider/05-historico-orcamentos.png'
import budgetDetails from '../assets/projects/gessolider/06-detalhes-orcamento.png'
import budgetPdf from '../assets/projects/gessolider/07-pdf-gerado.png'

export type ProjectScreenshot = {
  src: string
  title: string
  alt: string
  width: number
  height: number
}

export type ProjectDetails = {
  title: string
  subtitle: string
  status: string
  screenshots: readonly ProjectScreenshot[]
  about: readonly string[]
  stack: readonly string[]
  features: readonly string[]
  challenges: readonly string[]
  learnings: string
  nextSteps: string
  links: readonly { label: string; href: string; kind?: 'github' }[]
  seal?: { icon: LucideIcon }
}

export const projectDetails: Partial<Record<string, ProjectDetails>> = {
  gessolider: {
    title: 'GessoLider',
    subtitle: 'Sistema de Orçamentos para Construção a Seco',
    status: 'Em desenvolvimento',
    seal: { icon: PanelsTopLeft },
    screenshots: [
      { src: presentation, title: 'Apresentação do aplicativo', alt: 'Tela de apresentação do GessoLider', width: 1440, height: 1100 },
      { src: dashboard, title: 'Dashboard', alt: 'Painel principal do GessoLider', width: 1440, height: 1100 },
      { src: budgetCreation, title: 'Criação de orçamento', alt: 'Formulário de criação de orçamento', width: 1440, height: 1100 },
      { src: materials, title: 'Cálculo de materiais', alt: 'Tela de cálculo de materiais para construção a seco', width: 1440, height: 1100 },
      { src: budgetHistory, title: 'Histórico de orçamentos', alt: 'Lista de orçamentos registrados no GessoLider', width: 1440, height: 1100 },
      { src: budgetDetails, title: 'Detalhes do orçamento', alt: 'Tela com os dados de um orçamento', width: 1440, height: 1100 },
      { src: budgetPdf, title: 'PDF gerado', alt: 'Visualização do orçamento em PDF', width: 1440, height: 1100 },
    ],
    about: [
      'O GessoLider é uma aplicação desenvolvida para facilitar a criação, o cálculo e o gerenciamento de orçamentos de construção a seco, especialmente drywall.',
      'O projeto nasceu de uma necessidade real: ajudar meu pai, que trabalha nessa área, a elaborar orçamentos de maneira mais prática, organizada e eficiente.',
      'Embora tenha sido pensado inicialmente para ele, minha intenção é evoluir a aplicação para que outros gesseiros e profissionais do setor também possam utilizá-la no futuro.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'AsyncStorage', 'Node.js (node:test)'],
    features: [
      'Criação de orçamentos a partir de medidas.',
      'Cálculo de materiais e valores.',
      'Cadastro de informações de clientes.',
      'Histórico de orçamentos.',
      'Edição e duplicação de orçamentos.',
      'Exportação de orçamentos em PDF.',
      'Separação entre informações internas e as informações apresentadas ao cliente.',
    ],
    challenges: [
      'Um dos principais desafios foi adaptar a navegação para funcionar corretamente na versão Web.',
      'Outro desafio foi implementar a geração e a exportação de orçamentos em PDF, garantindo documentos claros e organizados.',
    ],
    learnings: 'Durante o desenvolvimento do GessoLider, venho aprendendo a organizar componentes passo a passo, planejar funcionalidades, prestar atenção aos detalhes e realizar testes para melhorar a experiência dos usuários.',
    nextSteps: 'Implementar o backend e evoluir o sistema para permitir acesso de diferentes usuários.',
    links: [
      {
        label: 'Ver código no GitHub',
        href: 'https://github.com/KettlemDrobinheski/GessoLider',
        kind: 'github',
      },
    ],
  },
}
