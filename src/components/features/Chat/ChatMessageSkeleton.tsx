import 'react-loading-skeleton/dist/skeleton.css'

import Skeleton from 'react-loading-skeleton'

export function ChatMessageSkeleton() {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-1.5">
        <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
          <span className="text-primary-foreground text-xs">✦</span>
        </div>
        <span className="text-muted-foreground text-xs">Resposta da IA</span>
      </div>
      <div className="w-[85%]">
        <Skeleton
          count={3}
          baseColor="var(--color-skeleton-base)"
          highlightColor="var(--color-skeleton-highlight)"
          borderRadius={8}
          className="mb-1"
        />
        <Skeleton
          width="60%"
          baseColor="var(--color-skeleton-base)"
          highlightColor="var(--color-skeleton-highlight)"
          borderRadius={8}
        />
      </div>
    </div>
  )
}
