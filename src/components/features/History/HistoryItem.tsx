import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import type { SimulationRecord } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'

interface HistoryItemProps {
  simulation: SimulationRecord
  isDeleting: boolean
  onDeleteRequest: (simulation: SimulationRecord) => void
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-primary mb-0.5 text-xs font-semibold tracking-widest uppercase">
        {label}
      </p>
      <p className="text-foreground truncate text-sm font-medium">{value}</p>
    </div>
  )
}

function formatDate(isoString?: string): string {
  if (!isoString) return '—'

  try {
    return new Date(isoString).toLocaleDateString('pt-BR')
  } catch {
    return '—'
  }
}

function formatMonthlySavings(simulation: SimulationRecord): string {
  try {
    const value = calcMonthlySavings(simulation)
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } catch {
    return '—'
  }
}

export function HistoryItem({
  simulation,
  isDeleting,
  onDeleteRequest,
}: HistoryItemProps) {
  const navigate = useNavigate()

  const goalName = simulation.goalName || 'Simulação sem nome'
  const goalAmount = simulation.goalAmount ? `R$ ${simulation.goalAmount}` : '—'
  const goalDeadline = simulation.goalDeadline
    ? `${simulation.goalDeadline} meses`
    : '—'
  const monthlySavings = formatMonthlySavings(simulation)
  const createdAt = formatDate(simulation.createdAt)

  const handleViewDetails = () => {
    void navigate(`/resultado/${simulation.id}`)
  }

  const handleDeleteRequest = () => {
    onDeleteRequest(simulation)
  }

  return (
    <article
      className="bg-card rounded-2xl p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[4px_4px_24px_0px_rgba(0,0,0,0.25)]"
      aria-label={`Simulação: ${goalName}`}
    >
      {/* Mobile layout: stacked */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="flex items-start gap-3">
          <div className="bg-muted-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <Goal size={20} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-foreground leading-tight font-semibold">
              {goalName}
            </p>
            <p className="text-muted-foreground text-xs">{createdAt}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MetaField label="Custo da Meta" value={goalAmount} />
          <MetaField label="Prazo" value={goalDeadline} />
          <MetaField label="Economia Mensal" value={monthlySavings} />
        </div>

        <Divider spacing={0} />

        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            icon={Trash2}
            aria-label={`Excluir simulação ${goalName}`}
            disabled={isDeleting}
            onClick={handleDeleteRequest}
            className="text-red-500 hover:opacity-70"
          />
          <Button
            variant="secondary"
            icon={ExternalLink}
            onClick={handleViewDetails}
            aria-label={`Ver detalhes de ${goalName}`}
          >
            Ver detalhes
          </Button>
        </div>
      </div>

      {/* Desktop/Tablet layout: row */}
      <div className="hidden items-center gap-4 sm:flex">
        {/* Icon + name */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="bg-muted-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <Goal size={20} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-foreground truncate leading-tight font-semibold">
              {goalName}
            </p>
            <p className="text-muted-foreground text-xs">{createdAt}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex shrink-0 items-center gap-6">
          <MetaField label="Custo da Meta" value={goalAmount} />
          <MetaField label="Prazo" value={goalDeadline} />
          <MetaField label="Economia Mensal" value={monthlySavings} />
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            icon={Trash2}
            aria-label={`Excluir simulação ${goalName}`}
            disabled={isDeleting}
            onClick={handleDeleteRequest}
            className="text-red-500 hover:opacity-70"
          />
          <Button
            variant="secondary"
            icon={ExternalLink}
            onClick={handleViewDetails}
            aria-label={`Ver detalhes de ${goalName}`}
          >
            Ver detalhes
          </Button>
        </div>
      </div>
    </article>
  )
}
