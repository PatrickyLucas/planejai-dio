import { SendHorizonal } from 'lucide-react'
import { type FormEvent, type KeyboardEvent, useRef, useState } from 'react'

interface ChatInputProps {
  isLoading: boolean
  onSend: (question: string) => void
}

export function ChatInput({ isLoading, onSend }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()

    const trimmed = value.trim()
    if (!trimmed || isLoading) return

    onSend(trimmed)
    setValue('')

    // Reseta a altura do textarea após envio
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  // Envio com Enter (sem Shift) — Shift+Enter adiciona nova linha
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-resize do textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }

  const canSend = value.trim().length > 0 && !isLoading

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2"
      aria-label="Enviar pergunta ao educador financeiro"
    >
      <div className="bg-input flex flex-1 items-end gap-2 rounded-2xl px-4 py-3 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
        <textarea
          ref={textareaRef}
          id="chat-input"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          placeholder="Qual são os investimentos mais seguros que posso usar para que minha renda aumente?"
          aria-label="Campo de pergunta ao educador financeiro"
          className="text-foreground placeholder:text-muted-foreground w-full resize-none bg-transparent text-sm leading-relaxed outline-none disabled:opacity-60"
          style={{ maxHeight: '120px' }}
        />
      </div>
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Enviar pergunta"
        className="bg-primary text-primary-foreground flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <SendHorizonal size={18} />
      </button>
    </form>
  )
}
