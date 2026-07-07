import { useCallback, useEffect, useRef, useState } from 'react'

import { buildSimulationContext } from '@/data/aiPrompt'
import type { ChatMessage } from '@/data/simulation'
import { askEducator } from '@/services/aiService'

import { useSimulationStorage } from './useSimulationStorage'

export const useChat = (simulationId: string) => {
  const isRequestPending = useRef(false)
  const { getFormData, updateSimulation } = useSimulationStorage()

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const simulation = getFormData(simulationId)
      return simulation?.chatHistory ?? []
    } catch {
      return []
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Persiste o histórico no localStorage sempre que messages mudar,
  // mas apenas após a montagem inicial (evita re-write desnecessário no mount).
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    try {
      const simulation = getFormData(simulationId)
      if (simulation) {
        updateSimulation(simulationId, { ...simulation, chatHistory: messages })
      }
    } catch {
      // Falha silenciosa na persistência — não interrompe a conversa
    }
  }, [messages, simulationId, getFormData, updateSimulation])

  const sendMessage = useCallback(
    async (question: string) => {
      // Validação: pergunta vazia ou só espaços
      const trimmed = question.trim()
      if (!trimmed) return

      // Previne múltiplas requisições simultâneas
      if (isRequestPending.current) return

      const simulation = getFormData(simulationId)
      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      // Monta a mensagem do usuário
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      }

      // Captura o histórico atual para enviar à IA (sem a nova mensagem ainda)
      let currentMessages: ChatMessage[] = []
      setMessages((prev) => {
        currentMessages = prev
        return [...prev, userMessage]
      })

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const context = buildSimulationContext(simulation)
        const responseText = await askEducator(
          context,
          currentMessages,
          trimmed,
        )

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: responseText,
          timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao comunicar com o educador financeiro.'

        setError(errorMessage)
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [simulationId, getFormData],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearError }
}
