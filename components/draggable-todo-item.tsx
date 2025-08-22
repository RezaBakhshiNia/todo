"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, GripVertical } from "lucide-react"
import type { Todo } from "@/lib/features/todos/todosSlice"
import { cn } from "@/lib/utils"

interface DraggableTodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function DraggableTodoItem({ todo, onToggle, onDelete }: DraggableTodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn("p-4 transition-all duration-200", isDragging && "opacity-50 shadow-lg scale-105 rotate-2")}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0 cursor-grab active:cursor-grabbing p-1 h-auto"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </Button>

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
