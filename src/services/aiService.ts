import type { ChatMessage } from '@/data/simulation'

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (prompt: string) => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt)
  const json = response.candidates[0].content.parts[0].text
  return JSON.parse(json) as InsightData
}

export const askEducator = async (
  simulationContext: string,
  history: ChatMessage[],
  question: string,
): Promise<string> => {
  const historyText = history
    .map((msg) =>
      msg.role === 'user'
        ? `Usuário: ${msg.content}`
        : `Educador Financeiro: ${msg.content}`,
    )
    .join('\n')

  const prompt = `Você é um educador financeiro especializado em finanças pessoais, com linguagem clara, didática e encorajadora, voltado para pessoas sem conhecimento financeiro. Fale sempre em segunda pessoa ("você", "sua", "seu").

Contexto da simulação financeira do usuário:
${simulationContext}

${historyText ? `Histórico da conversa:\n${historyText}\n` : ''}Usuário: ${question}

Responda de forma clara, prática e motivadora. Seja específico com base nos dados da simulação. Não use markdown. Responda apenas como "Educador Financeiro" sem incluir o prefixo na resposta. Máximo de 4 parágrafos.`

  const response = await callGeminiAPI(prompt)
  const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  if (!text.trim()) {
    throw new Error('A IA retornou uma resposta vazia.')
  }

  return text.trim()
}
