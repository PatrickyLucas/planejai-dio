import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from './Button'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  simulationName: string
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDeleteModal({
  isOpen,
  simulationName,
  isDeleting,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  // Fecha com Escape
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-delete-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="bg-card relative w-full max-w-md rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.3)]">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <h2
            id="confirm-delete-title"
            className="text-foreground text-base font-semibold"
          >
            Excluir simulação
          </h2>
        </div>

        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          Tem certeza que deseja excluir{' '}
          <span className="text-foreground font-semibold">
            &ldquo;{simulationName}&rdquo;
          </span>
          ? Esta ação não pode ser desfeita.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isDeleting}
            className="justify-center rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isDeleting}
            className="justify-center rounded-xl bg-red-500 hover:opacity-80"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </div>
    </div>
  )
}
