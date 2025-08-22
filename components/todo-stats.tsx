"use client"

import { useAppSelector } from "@/lib/hooks"
import { Card } from "@/components/ui/card"

export function TodoStats() {
  const todos = useAppSelector((state) => state.todos.items)

  const totalTodos = todos.length
  const completedTodos = todos.filter((todo) => todo.completed).length
  const pendingTodos = totalTodos - completedTodos

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-4">
          <span className="text-muted-foreground">
            Total: <span className="font-medium text-foreground">{totalTodos}</span>
          </span>
          <span className="text-muted-foreground">
            Completed: <span className="font-medium text-green-600">{completedTodos}</span>
          </span>
          <span className="text-muted-foreground">
            Pending: <span className="font-medium text-orange-600">{pendingTodos}</span>
          </span>
        </div>
        {totalTodos > 0 && (
          <div className="text-muted-foreground">{Math.round((completedTodos / totalTodos) * 100)}% complete</div>
        )}
      </div>
    </Card>
  )
}
