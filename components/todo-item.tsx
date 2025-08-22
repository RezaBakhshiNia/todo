"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import type { Todo } from "@/lib/features/todos/todosSlice"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} className="flex-shrink-0" />
        <div
          className={cn(
            "flex-1 cursor-pointer select-none transition-all duration-200",
            todo.completed && "line-through text-muted-foreground",
          )}
          onClick={() => onToggle(todo.id)}
        >
          <p className="text-sm font-medium">{todo.todo}</p>
          <p className="text-xs text-muted-foreground mt-1">Status: {todo.completed ? "Completed" : "Pending"}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
