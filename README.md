<div align="center">

<img src="https://hermes.dio.me/assets/diome/logo-full.svg" alt="DIO Logo" height="40" />
&nbsp;&nbsp;&nbsp;
<img src="https://assets.santanderopenacademy.com/images/logos/logo-soa.svg" alt="Santander Logo" height="40" />

<br /><br />

# 💸 Planejai — Planejador Financeiro com IA

**Projeto desenvolvido como parte do Bootcamp Santander × DIO**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Contexto do Bootcamp](#-contexto-do-bootcamp)
- [Funcionalidades](#-funcionalidades)
- [Desafios Implementados](#-desafios-implementados)
  - [Histórico de Simulações](#1-histórico-de-simulações)
  - [Conversando com o Educador Financeiro](#2-conversando-com-o-educador-financeiro)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Stack Tecnológica](#-stack-tecnológica)
- [Como Executar](#-como-executar)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura de Pastas](#-estrutura-de-pastas)

---

## 🧾 Sobre o Projeto

O **Planejai** é uma aplicação web de planejamento financeiro pessoal que utiliza Inteligência Artificial para ajudar o usuário a entender sua situação financeira atual e traçar estratégias concretas para atingir seus objetivos de vida — seja uma viagem, a compra de um imóvel, a quitação de dívidas ou qualquer outra meta.

O usuário informa dados como renda mensal, custos fixos, dívidas e a meta que deseja alcançar. A IA (Google Gemini) analisa essas informações e gera um **diagnóstico financeiro personalizado**, com viabilidade da meta, sugestões práticas, ideias de renda extra, recomendações de investimento e uma mensagem motivacional.

Além disso, é possível **conversar diretamente com o Educador Financeiro** — um assistente de IA contextualizado com os dados da sua simulação — para tirar dúvidas e aprofundar o planejamento em tempo real.

---

## 🎓 Contexto do Bootcamp

Este projeto foi desenvolvido durante o **Bootcamp Santander × DIO**, uma iniciativa do **Banco Santander** em parceria com a **[DIO (Digital Innovation One)](https://dio.me)** com o objetivo de capacitar desenvolvedores em habilidades modernas de front-end e integração com Inteligência Artificial.

O bootcamp incentiva a construção de projetos práticos que reflitam o uso real de tecnologias emergentes, como APIs de IA generativa, em aplicações com foco em impacto social e educação financeira.

> 🏦 O projeto foi idealizado com o propósito de democratizar o acesso a orientações financeiras de qualidade, utilizando IA de forma acessível e amigável para pessoas que não possuem conhecimento técnico em finanças.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 📊 **Simulação Financeira** | Formulário multi-etapas guiado para coleta dos dados financeiros |
| 🤖 **Diagnóstico com IA** | Análise personalizada gerada pelo Google Gemini com base nos dados inseridos |
| 📈 **Resultado Visual** | Painel com cards de resumo: meta, prazo, economia mensal necessária |
| 💬 **Chat com Educador Financeiro** | Conversa contextualizada em tempo real com a IA sobre a simulação |
| 📁 **Histórico de Simulações** | Lista completa de simulações anteriores com gerenciamento (ver / excluir) |
| 💾 **Persistência Local** | Todos os dados, insights e conversas salvos no `localStorage` |
| 🌙 **Tema Claro / Escuro** | Alternância de tema com preferência do sistema detectada automaticamente |
| 📱 **Design Responsivo** | Interface adaptada para mobile, tablet e desktop |

---

## 🏆 Desafios Implementados

Os itens a seguir representam as funcionalidades desenvolvidas como **desafio prático** dentro do bootcamp, indo além do escopo base do projeto e exigindo decisões técnicas mais avançadas de arquitetura, integração com IA e gerenciamento de estado.

---

### 1. Histórico de Simulações

**Localização:** `/historico` — [`SimulationHistoryPage.tsx`](./src/pages/SimulationHistoryPage.tsx)

A página de histórico permite que o usuário consulte todas as simulações financeiras já realizadas, sem precisar refazê-las. É uma funcionalidade essencial para quem acompanha sua evolução financeira ao longo do tempo.

#### O que foi implementado

- **Listagem completa** de todas as simulações salvas no `localStorage`, ordenadas da mais recente para a mais antiga
- **Cards informativos** com nome da meta, custo, prazo e economia mensal calculada
- **Acesso rápido** aos detalhes de qualquer simulação anterior (com carregamento do insight da IA previamente gerado)
- **Exclusão com confirmação** via modal dedicado (`ConfirmDeleteModal`), evitando exclusões acidentais
- **Estado de carregamento** com `Skeleton` animado enquanto os dados são lidos
- **Estado vazio** amigável incentivando a criação da primeira simulação
- **Estado de erro** com opção de nova tentativa

#### Decisões técnicas

- Os dados são recuperados via `useSimulationStorage` hook customizado, que encapsula toda a lógica de `localStorage`
- A ordenação é feita por `createdAt` (ISO string) sem dependência de bibliotecas externas
- O componente `HistoryItem` possui dois layouts distintos (mobile stack / desktop row) com classes Tailwind condicionais
- Cada item da lista possui `aria-label` descritivo para acessibilidade com leitores de tela

---

### 2. Conversando com o Educador Financeiro

**Localização:** dentro do `AIInsightsCard` na página `/resultado/:id`

Este é o **principal desafio técnico** do projeto. Após gerar o diagnóstico financeiro, o usuário pode iniciar uma conversa direta com a IA, fazendo perguntas específicas sobre sua simulação e recebendo respostas contextualizadas.

> A IA tem acesso completo ao contexto financeiro do usuário (renda, gastos, dívidas, meta, prazo) e ao histórico da conversa, garantindo respostas precisas e personalizadas.

#### O que foi implementado

##### Interface de Chat
- **Campo de pergunta** com `textarea` auto-redimensionável (cresce conforme o conteúdo)
- **Envio via botão** (ícone de avião de papel) ou tecla **Enter** (Shift+Enter para nova linha)
- **Bolhas de mensagem** visualmente diferenciadas: usuário (direita, cor primária) e IA (esquerda, borda sutil)
- **Timestamp** em cada mensagem
- **Scroll automático suave** até a última mensagem sempre que há nova interação
- **Estado de carregamento** com `Skeleton` animado durante a geração da resposta
- **Estado vazio** com ícone e incentivo à primeira pergunta
- **Mensagem de erro inline** que não apaga o histórico e permite nova tentativa

##### Contexto e IA
- A função `buildSimulationContext()` gera um resumo textual dos dados financeiros da simulação
- A função `askEducator()` monta um prompt completo com: persona do educador, contexto da simulação, histórico da conversa e nova pergunta
- O histórico da conversa é enviado à IA a cada nova mensagem, permitindo respostas coerentes e encadeadas
- A IA responde em **texto livre** (não JSON estruturado), com linguagem clara e motivadora

##### Persistência do Histórico
- Cada mensagem é salva imediatamente no `localStorage` após a resposta da IA
- O histórico é armazenado como `chatHistory: ChatMessage[]` dentro do `SimulationRecord` correspondente
- Ao retornar para uma simulação, o histórico completo é restaurado automaticamente
- **Cada simulação possui seu próprio histórico** — conversas não se misturam entre simulações diferentes
- Compatibilidade garantida com dados antigos: o campo `chatHistory` é opcional, portanto simulações anteriores continuam funcionando

##### Tratamento de Cenários Críticos

| Cenário | Tratamento |
|---|---|
| Pergunta vazia ou só espaços | Bloqueada no frontend, botão permanece desabilitado |
| Cliques múltiplos / requisições duplicadas | Bloqueados via `isRequestPending` (`useRef`) |
| Resposta vazia da IA | Lança erro tratado com mensagem amigável |
| Erro de rede ou da API | Exibido inline sem apagar o histórico |
| Falha ao salvar no localStorage | Silenciosa — UX não é interrompida |
| Histórico corrompido | Recuperação segura com `try/catch` + fallback para `[]` |

##### Arquivos criados para este desafio

```
src/
├── hooks/
│   └── useChat.tsx                      # Hook principal do chat
├── components/features/Chat/
│   ├── ChatSection.tsx                  # Container orquestrador com scroll automático
│   ├── ChatMessage.tsx                  # Bolha de mensagem (user / assistant)
│   ├── ChatMessageSkeleton.tsx          # Skeleton de loading da resposta
│   ├── ChatInput.tsx                    # Textarea + botão de envio
│   └── ChatEmptyState.tsx              # Estado vazio
```

##### Arquivos modificados

| Arquivo | Alteração |
|---|---|
| `src/data/simulation.ts` | + Interface `ChatMessage`, + campo `chatHistory?` em `SimulationRecord` |
| `src/services/aiService.ts` | + Função `askEducator(context, history, question)` |
| `src/data/aiPrompt.ts` | + Função `buildSimulationContext(simulation)` |
| `src/components/features/SimulationResults/AIInsightsCardProps.tsx` | + Integração do `ChatSection` abaixo do diagnóstico |

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura **feature-based** com separação clara de responsabilidades:

```
┌─────────────────────────────────────────────────────┐
│                      Pages                          │
│  (SimulationFormPage / ResultsPage / HistoryPage)   │
└─────────────────┬───────────────────────────────────┘
                  │ usa
┌─────────────────▼───────────────────────────────────┐
│                 Feature Components                  │
│   (Simulation / SimulationResults / Insights / Chat)│
└────────────┬────────────────────────────────────────┘
             │ usa
┌────────────▼────────────────────────────────────────┐
│             Shared Components + Hooks               │
│    (Button / Input / Divider / useInsight / useChat)│
└────────────┬────────────────────────────────────────┘
             │ usa
┌────────────▼────────────────────────────────────────┐
│           Services + Data + Utils                   │
│      (aiService / aiPrompt / simulation / currency) │
└─────────────────────────────────────────────────────┘
             │ persiste em
┌────────────▼────────────────────────────────────────┐
│                   localStorage                      │
│         (simulation-data: SimulationRecord[])       │
└─────────────────────────────────────────────────────┘
```

### Principais padrões adotados

- **Hooks customizados** encapsulam lógica de negócio (`useInsight`, `useChat`, `useSimulationStorage`, `useTheme`)
- **Design system** via CSS custom properties em `theme.css` — sem hardcode de cores nos componentes
- **Skeleton** padronizado com `react-loading-skeleton` e CSS vars do tema
- **Prevenção de loop infinito** e requisições duplicadas com `useRef` (não causa re-renders)
- **Persistência segura** com `try/catch` em todas as operações de `localStorage`

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev) | 19 | Interface de usuário |
| [TypeScript](https://typescriptlang.org) | 6 | Tipagem estática |
| [Vite](https://vitejs.dev) | 8 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Estilização utility-first |
| [React Router DOM](https://reactrouter.com) | v7 | Roteamento client-side |
| [Lucide React](https://lucide.dev) | — | Biblioteca de ícones |
| [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) | 3.5 | Skeleton de carregamento |
| [Google Gemini API](https://ai.google.dev) | gemini-flash-latest | Inteligência Artificial |
| [@fontsource/inter](https://fontsource.org) | — | Tipografia (self-hosted) |

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** `>= 18`
- **npm** `>= 9`
- Uma chave de API do **[Google AI Studio](https://aistudio.google.com/)**

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/PatrickyLucas/planejai-dio.git
cd planejai

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o arquivo .env.local e insira sua chave da API do Gemini

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Gera o build de produção em `/dist` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o ESLint em todo o projeto |

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

> ⚠️ **Importante:** Nunca commite a chave de API no repositório. O arquivo `.env.local` já está incluído no `.gitignore`.

Para obter uma chave gratuita: [Google AI Studio → Get API Key](https://aistudio.google.com/app/apikey)

---

## 📁 Estrutura de Pastas

```
planejai/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── features/
│   │   │   ├── Chat/                   # 💬 Chat com Educador Financeiro (desafio)
│   │   │   │   ├── ChatSection.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── ChatMessageSkeleton.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── ChatEmptyState.tsx
│   │   │   ├── History/                # 📁 Histórico de Simulações (desafio)
│   │   │   │   ├── HistoryList.tsx
│   │   │   │   ├── HistoryItem.tsx
│   │   │   │   └── HistoryEmptyState.tsx
│   │   │   ├── Insights/               # ✨ Renderização do Diagnóstico IA
│   │   │   │   ├── Content.tsx
│   │   │   │   └── Error.tsx
│   │   │   ├── Simulation/             # 📋 Formulário Multi-etapas
│   │   │   └── SimulationResults/      # 📊 Resultados e Cards
│   │   ├── layout/
│   │   └── shared/                     # 🧩 Componentes Reutilizáveis
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Divider.tsx
│   │       ├── Header.tsx
│   │       ├── PageHero.tsx
│   │       └── ConfirmDeleteModal.tsx
│   ├── context/
│   │   └── theme/                      # 🌙 Contexto de Tema Claro/Escuro
│   ├── data/
│   │   ├── simulation.ts               # Tipos e dados do formulário
│   │   └── aiPrompt.ts                 # Construtores de prompt para a IA
│   ├── hooks/
│   │   ├── useInsight.tsx              # Hook do diagnóstico IA
│   │   ├── useChat.tsx                 # Hook do chat (desafio)
│   │   ├── useSimulationStorage.tsx    # Hook de persistência
│   │   └── useTheme.tsx               # Hook de tema
│   ├── pages/
│   │   ├── SimulationFormPage.tsx
│   │   ├── SimulationResultsPage.tsx
│   │   └── SimulationHistoryPage.tsx   # Página de histórico (desafio)
│   ├── services/
│   │   └── aiService.ts               # Integração com a API do Gemini
│   ├── styles/
│   │   └── theme.css                  # Design system (CSS custom properties)
│   └── utils/
│       ├── currency.ts
│       └── simulation.ts
├── .env.local                          # Variáveis de ambiente (não versionado)
├── index.html
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do **Bootcamp Santander × DIO**. Sinta-se livre para utilizá-lo como referência de estudo.

---

<div align="center">

Desenvolvido com 💜 durante o **Bootcamp Santander × DIO**

[![DIO](https://img.shields.io/badge/DIO-Digital_Innovation_One-E0007A?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNC41di05bDYgNC41LTYgNC41eiIvPjwvc3ZnPg==)](https://dio.me)
&nbsp;&nbsp;
[![Santander](https://img.shields.io/badge/Santander-Bootcamp-EC0000?style=flat-square)](https://www.santanderopenacademy.com/pt_br/index.html)

</div>
