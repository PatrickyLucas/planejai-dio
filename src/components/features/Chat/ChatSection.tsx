import { AlertCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { useChat } from '@/hooks/useChat'

import { ChatEmptyState } from './ChatEmptyState'
import { ChatInput } from './ChatInput'
import { ChatMessage } from './ChatMessage'
import { ChatMessageSkeleton } from './ChatMessageSkeleton'

interface ChatSectionProps {
  simulationId: string
}

export function ChatSection({ simulationId }: ChatSectionProps) {
  const { messages, isLoading, error, sendMessage, clearError } =
    useChat(simulationId)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll automático suave sempre que mensagens ou loading mudam
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  const hasMessages = messages.length > 0

  return (
    <section aria-label="Conversa com o educador financeiro">
      {/* Cabeçalho */}
      <div className="mb-4 flex items-center gap-1.5">
        <span aria-hidden="true">🎓</span>
        <h2 className="text-primary text-xs font-semibold tracking-widest uppercase">
          Conversando com o Educador Financeiro
        </h2>
      </div>

      {/* Área de mensagens */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Histórico da conversa"
        className="mb-4 flex max-h-80 scrollbar-thin [scrollbar-color:var(--border)_transparent] flex-col gap-4 overflow-y-auto pr-1"
      >
        {!hasMessages && !isLoading && <ChatEmptyState />}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <ChatMessageSkeleton />}

        {/* Âncora para scroll automático */}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* Mensagem de erro inline — não apaga o histórico */}
      {error && !isLoading && (
        <div
          role="alert"
          className="mb-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 dark:bg-red-900/20"
        >
          <AlertCircle
            size={15}
            className="mt-0.5 shrink-0 text-red-500"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-red-500">⚠️ {error}</p>
            <button
              onClick={clearError}
              className="mt-0.5 cursor-pointer text-xs text-red-400 underline hover:opacity-80"
              aria-label="Fechar mensagem de erro"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Input de pergunta */}
      <ChatInput isLoading={isLoading} onSend={sendMessage} />
    </section>
  )
}
