"use client"

import { useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { todosApi } from "@/lib/api/todos"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setTodos, removeTodo, toggleTodo } from "@/lib/features/todos/todosSlice"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { TodoList } from "./todo-list"
import { TodoStats } from "./todo-stats"
import { AddTodoForm } from "./add-todo-form"
import { DeleteTodoDialog } from "./delete-todo-dialog"
import { PaginationControls } from "./pagination-controls"
import { TodoListSkeleton } from "./todo-skeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { DeleteModal } from "./types/modals"

export function TodoApp() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const todos = useAppSelector((state) => state.todos.items)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 30
  const [deleteDialog, setDeleteDialog] = useState<DeleteModal>({ open: false, todoId: null, todoTitle: "" })

  const {
    data: todosData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["todos", currentPage],
    queryFn: () => todosApi.getTodos(currentPage, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  useEffect(() => {
    if (todosData?.todos) {
      dispatch(setTodos(todosData.todos))
    }
  }, [todosData, dispatch])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = todosData ? Math.ceil(todosData.total / limit) : 1

  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.deleteTodo,
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] })
      dispatch(removeTodo(todoId))
      return { todoId }
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: "Todo deleted successfully!",
      })
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
    onError: (error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete todo",
        variant: "destructive",
      })
    },
    onSettled: () => {
      setDeleteDialog({ open: false, todoId: null, todoTitle: "" })
    },
  })

  const toggleTodoMutation = useMutation({
    mutationFn: async (todoId: number) => {
      const todo = todos.find((t) => t.id === todoId)
      if (!todo) throw new Error("Todo not found")
      return todosApi.updateTodo(todoId, { completed: !todo.completed })
    },
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] })
      dispatch(toggleTodo(todoId))
      return { todoId }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      toast({
        title: "Success",
        description: `Todo marked as ${data.completed ? "completed" : "incomplete"}!`,
      })
    },
    onError: (error, variables, context) => {
      if (context?.todoId) {
        dispatch(toggleTodo(context.todoId))
      }
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update todo",
        variant: "destructive",
      })
    },
  })

  const handleToggleTodo = (id: number) => {
    toggleTodoMutation.mutate(id)
  }

  const handleDeleteTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      setDeleteDialog({
        open: true,
        todoId: id,
        todoTitle: todo.todo,
      })
    }
  }

  const handleConfirmDelete = () => {
    if (deleteDialog.todoId) {
      deleteTodoMutation.mutate(deleteDialog.todoId)
    }
  }

  const handleTodoAdded = () => {
    setCurrentPage(1)
  }

  if (isLoading && !todosData) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-24" />
          </div>
        </Card>
        <Card className="p-6">
          <TodoListSkeleton />
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          Error loading todos: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <AddTodoForm onTodoAdded={handleTodoAdded} />

      <TodoStats />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Todos</h2>
          <div className="text-sm text-muted-foreground">{todosData?.total || 0} total todos</div>
        </div>
        <p className="text-sm text-muted-foreground">Drag and drop todos using the grip handle to reorder them</p>

        {isFetching && todosData ? (
          <TodoListSkeleton />
        ) : (
          <TodoList onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isFetching}
        />
      </div>

      <DeleteTodoDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={handleConfirmDelete}
        todoTitle={deleteDialog.todoTitle}
        isDeleting={deleteTodoMutation.isPending}
      />
    </div>
  )
}
