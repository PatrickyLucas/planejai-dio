import 'react-loading-skeleton/dist/skeleton.css'

import { RefreshCw } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'

import { Button } from '@/components/shared/Button'
import type { SimulationRecord } from '@/data/simulation'

import { HistoryEmptyState } from './HistoryEmptyState'
import { HistoryItem } from './HistoryItem'

interface HistoryListProps {
  simulations: SimulationRecord[]
  isLoading: boolean
  error: string | null
  deletingId: string | null
  onDeleteRequest: (simulation: SimulationRecord) => void
  onRetry: () => void
}

function HistoryListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-2xl p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]"
        >
          <Skeleton
            height={56}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            borderRadius={8}
          />
        </div>
      ))}
    </div>
  )
}

export function HistoryList({
  simulations,
  isLoading,
  error,
  deletingId,
  onDeleteRequest,
  onRetry,
}: HistoryListProps) {
  if (isLoading) {
    return <HistoryListSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="text-sm text-red-500">⚠️ {error}</p>
        <Button variant="secondary" icon={RefreshCw} onClick={onRetry}>
          Tentar novamente
        </Button>
      </div>
    )
  }

  if (simulations.length === 0) {
    return <HistoryEmptyState />
  }

  return (
    <ul
      className="flex flex-col gap-3"
      role="list"
      aria-label="Simulações salvas"
    >
      {simulations.map((simulation) => (
        <li key={simulation.id}>
          <HistoryItem
            simulation={simulation}
            isDeleting={deletingId === simulation.id}
            onDeleteRequest={onDeleteRequest}
          />
        </li>
      ))}
    </ul>
  )
}
