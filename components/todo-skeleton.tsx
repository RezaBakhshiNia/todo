import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TodoSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-4 w-4 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </Card>
  )
}

export function TodoListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <TodoSkeleton key={index} />
      ))}
    </div>
  )
}
