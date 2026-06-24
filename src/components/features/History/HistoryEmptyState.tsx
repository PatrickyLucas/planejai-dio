import { TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'

export function HistoryEmptyState() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="bg-muted-primary flex h-16 w-16 items-center justify-center rounded-full">
        <span className="text-3xl" role="img" aria-label="Calendário">
          📅
        </span>
      </div>
      <div>
        <p className="text-foreground mb-1 font-semibold">
          Nenhuma simulação ainda
        </p>
        <p className="text-muted-foreground text-sm">
          Crie sua primeira simulação e acompanhe o progresso dos seus objetivos
          financeiros.
        </p>
      </div>
      <Button
        variant="secondary"
        icon={TrendingUp}
        onClick={() => void navigate('/')}
      >
        Nova Simulação
      </Button>
    </div>
  )
}
