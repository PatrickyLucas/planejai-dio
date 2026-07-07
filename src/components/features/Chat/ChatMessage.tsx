import type { ChatMessage as ChatMessageType } from '@/data/simulation'

interface ChatMessageProps {
  message: ChatMessageType
}

function formatTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const time = formatTime(message.timestamp)

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs">Você</span>
          <div className="bg-muted-primary flex h-5 w-5 items-center justify-center rounded-full">
            <span className="text-primary text-xs font-semibold">V</span>
          </div>
        </div>
        <div className="bg-muted-primary max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2.5">
          <p className="text-foreground text-sm leading-relaxed">
            {message.content}
          </p>
        </div>
        {time && <span className="text-muted-foreground text-xs">{time}</span>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-1.5">
        <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
          <span className="text-primary-foreground text-xs">✦</span>
        </div>
        <span className="text-muted-foreground text-xs">Resposta da IA</span>
      </div>
      <div className="bg-card border-border max-w-[90%] rounded-2xl rounded-tl-sm border px-3.5 py-2.5">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {message.content}
        </p>
      </div>
      {time && <span className="text-muted-foreground text-xs">{time}</span>}
    </div>
  )
}
