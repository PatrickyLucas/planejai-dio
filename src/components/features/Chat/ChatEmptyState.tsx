export function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="bg-muted-primary flex h-14 w-14 items-center justify-center rounded-full">
        <span className="text-2xl" role="img" aria-label="Educador financeiro">
          🎓
        </span>
      </div>
      <div>
        <p className="text-foreground mb-1 text-sm font-semibold">
          Nenhuma pergunta ainda
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Faça sua primeira pergunta ao educador financeiro sobre sua simulação.
        </p>
      </div>
    </div>
  )
}
