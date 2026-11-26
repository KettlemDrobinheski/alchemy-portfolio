import { PanelsTopLeft, Settings, type LucideIcon } from 'lucide-react'
import presentation from '../assets/projects/gessolider/01-apresentacao.png'
import dashboard from '../assets/projects/gessolider/02-dashboard.png'
import budgetCreation from '../assets/projects/gessolider/03-criacao-orcamento.png'
import materials from '../assets/projects/gessolider/04-calculo-materiais.png'
import budgetHistory from '../assets/projects/gessolider/05-historico-orcamentos.png'
import budgetDetails from '../assets/projects/gessolider/06-detalhes-orcamento.png'
import budgetPdf from '../assets/projects/gessolider/07-pdf-gerado.png'
import lupoLogin from '../assets/projects/lupocalibra/01-login.png'
import lupoDashboard from '../assets/projects/lupocalibra/02-dashboard.png'
import lupoSimulation from '../assets/projects/lupocalibra/03-simulacao.png'
import lupoProduction from '../assets/projects/lupocalibra/04-producao.png'
import lupoRegulation from '../assets/projects/lupocalibra/05-regulagem.png'
import lupoInterlock from '../assets/projects/lupocalibra/06-bloqueio.png'
import lupoReset from '../assets/projects/lupocalibra/07-reset.png'

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
  links: readonly { label: string; href: string; kind?: 'github' | 'demo' }[]
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
      { label: 'Explorar demonstração', href: 'https://kettlemdrobinheski.github.io/GessoLider/', kind: 'demo' },
      {
        label: 'Ver código no GitHub',
        href: 'https://github.com/KettlemDrobinheski/GessoLider',
        kind: 'github',
      },
    ],
  },
  lupocalibra: {
    title: 'LupoCalibra',
    subtitle: 'Simulador de classificação por peso em uma linha de embalagem',
    status: 'Protótipo funcional',
    seal: { icon: Settings },
    screenshots: [
      { src: lupoLogin, title: 'Login e apresentação', alt: 'Tela de acesso do LupoCalibra com o botão Explorar demonstração', width: 1440, height: 1100 },
      { src: lupoDashboard, title: 'Painel com as 16 cubas', alt: 'Painel da demonstração com oito cubas em cada lado da linha', width: 1440, height: 1100 },
      { src: lupoSimulation, title: 'Simulação em funcionamento', alt: 'Linha de embalagem simulada em operação e pesos individuais por cuba', width: 1440, height: 1100 },
      { src: lupoProduction, title: 'Contadores de produção', alt: 'Contadores atualizados de peças aprovadas nas 16 cubas', width: 1440, height: 1100 },
      { src: lupoRegulation, title: 'Regulagem de peso e tolerância', alt: 'Central de regulagem com campos de peso-alvo e tolerância percentual', width: 1440, height: 1100 },
      { src: lupoInterlock, title: 'Bloqueio por peso', alt: 'Linha bloqueada após cinco peças fora da faixa na mesma cuba', width: 1440, height: 1100 },
      { src: lupoReset, title: 'Painel após o reset', alt: 'Linha desbloqueada e pausada com as contagens preservadas', width: 1440, height: 1100 },
    ],
    about: [
      'O LupoCalibra nasceu da minha experiência em produção industrial. Usei a classificação por peso em uma linha de embalagem como ponto de partida para explorar como regulagens e desvios afetam a operação.',
      'É um protótipo de simulação, sem integração com máquinas, balanças, sensores ou controladores industriais reais. A demonstração usa dados fictícios e funciona sem cadastro.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase Authentication', 'Cloud Firestore', 'GitHub Pages'],
    features: [
      'Simulação de 16 cubas, oito por lado, com vazão nominal de 120 peças por minuto em cada uma.',
      'Regulagem de peso-alvo e tolerância, com contagem individual das peças aprovadas.',
      'Bloqueio após cinco peças fora da faixa na mesma cuba em até dois minutos, com reset.',
      'Demonstração pública com dados fictícios em memória, independentes por aba.',
      'Modo autenticado com consulta para ADMIN e autorização exclusiva de simulação para OPERADOR.',
    ],
    challenges: [
      'Coordenar uma única sessão autenticada por linha e interromper a simulação ao receber um bloqueio remoto.',
      'Compartilhar o motor e a interface com a demonstração, mantendo os dados fictícios separados das operações do Firebase.',
    ],
    learnings: 'Aprendi a separar a classificação por peso da interface, testar a vazão com um relógio controlado e usar transações para coordenar sessões concorrentes.',
    nextSteps: 'Refinar os cenários da simulação e evoluir os testes de usabilidade e operação.',
    links: [
      { label: 'Explorar demonstração', href: 'https://kettlemdrobinheski.github.io/LupoCalibra/demo/', kind: 'demo' },
      { label: 'Ver código no GitHub', href: 'https://github.com/KettlemDrobinheski/LupoCalibra', kind: 'github' },
    ],
  },
}
