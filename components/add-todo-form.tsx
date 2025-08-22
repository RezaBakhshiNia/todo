"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { todosApi } from "@/lib/api/todos"
import { useAppDispatch } from "@/lib/hooks"
import { addTodo, replaceOptimisticTodo, removeTodo } from "@/lib/features/todos/todosSlice"
import { createTodoSchema, type CreateTodoInput } from "@/lib/validations/todo"

interface AddTodoFormProps {
  onTodoAdded?: () => void
}

export function AddTodoForm({ onTodoAdded }: AddTodoFormProps) {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const form = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      todo: "",
    },
  })

  const createTodoMutation = useMutation({
    mutationFn: todosApi.createTodo,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["todos"] })

      const optimisticTodo = {
        id: -Date.now(), // Negative temporary ID
        todo: newTodo.todo,
        completed: false,
        userId: 1,
      }
      dispatch(addTodo(optimisticTodo))

      return { optimisticTodo }
    },
    onSuccess: (data, variables, context) => {
      if (context?.optimisticTodo) {
        dispatch(
          replaceOptimisticTodo({
            tempId: context.optimisticTodo.id,
            realTodo: data,
          }),
        )
      }

      queryClient.invalidateQueries({ queryKey: ["todos"] })

      // Call the callback to reset to page 1
      onTodoAdded?.()

      toast({
        title: "Success",
        description: "Todo added successfully!",
      })

      form.reset()
    },
    onError: (error, variables, context) => {
      if (context?.optimisticTodo) {
        dispatch(removeTodo(context.optimisticTodo.id))
      }

      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add todo",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: CreateTodoInput) => {
    createTodoMutation.mutate({
      todo: data.todo,
      completed: false,
      userId: 1, // Default user ID
    })
  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="What needs to be done?" {...field} disabled={createTodoMutation.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createTodoMutation.isPending} className="flex-shrink-0">
              {createTodoMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Add
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
