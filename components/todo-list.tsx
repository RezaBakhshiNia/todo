"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"

import { DraggableTodoItem } from "./draggable-todo-item"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { reorderTodos } from "@/lib/features/todos/todosSlice"

interface TodoListProps {
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoList({ onToggle, onDelete }: TodoListProps) {
  const dispatch = useAppDispatch()
  const { items: todos, dragOrder } = useAppSelector((state) => state.todos)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Sort todos according to drag order
  const sortedTodos = [...todos].sort((a, b) => {
    const aIndex = dragOrder.indexOf(a.id)
    const bIndex = dragOrder.indexOf(b.id)
    return aIndex - bIndex
  })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = dragOrder.indexOf(active.id as number)
      const newIndex = dragOrder.indexOf(over.id as number)

      const newOrder = arrayMove(dragOrder, oldIndex, newIndex)
      dispatch(reorderTodos(newOrder))
    }
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No todos yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      >
        <SortableContext items={dragOrder} strategy={verticalListSortingStrategy}>
          {sortedTodos.map((todo) => (
            <DraggableTodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
