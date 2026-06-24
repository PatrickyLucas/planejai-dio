import { useCallback, useEffect, useState } from 'react'

import { HistoryList } from '@/components/features/History/HistoryList'
import { ConfirmDeleteModal } from '@/components/shared/ConfirmDeleteModal'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()

  const [simulations, setSimulations] = useState<SimulationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<SimulationRecord | null>(
    null,
  )

  const loadSimulations = useCallback(() => {
    setIsLoading(true)
    setError(null)

    try {
      const data = getAllSimulations()
      // Ordenar da mais recente para a mais antiga
      const sorted = [...data].sort((a, b) => {
        if (!a.createdAt && !b.createdAt) return 0
        if (!a.createdAt) return 1
        if (!b.createdAt) return -1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      setSimulations(sorted)
    } catch {
      setError('Não foi possível carregar o histórico. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [getAllSimulations])

  useEffect(() => {
    loadSimulations()
  }, [loadSimulations])

  const handleDeleteRequest = (simulation: SimulationRecord) => {
    setPendingDelete(simulation)
  }

  const handleDeleteCancel = () => {
    setPendingDelete(null)
  }

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return

    const idToDelete = pendingDelete.id
    setDeletingId(idToDelete)
    setPendingDelete(null)

    try {
      deleteSimulation(idToDelete)
      setSimulations((prev) => prev.filter((s) => s.id !== idToDelete))
    } catch {
      setError('Não foi possível excluir a simulação. Tente novamente.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />

      <HistoryList
        simulations={simulations}
        isLoading={isLoading}
        error={error}
        deletingId={deletingId}
        onDeleteRequest={handleDeleteRequest}
        onRetry={loadSimulations}
      />

      <ConfirmDeleteModal
        isOpen={pendingDelete !== null}
        simulationName={pendingDelete?.goalName ?? 'esta simulação'}
        isDeleting={deletingId !== null}
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={handleDeleteCancel}
      />
    </main>
  )
}
