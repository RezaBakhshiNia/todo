import type { Todo } from "../features/todos/todosSlice"

const API_BASE = "https://dummyjson.com"

export interface TodosResponse {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}

export interface CreateTodoRequest {
  todo: string
  completed: boolean
  userId: number
}

export interface UpdateTodoRequest {
  todo?: string
  completed?: boolean
}

export const todosApi = {
  // Get all todos
  getTodos: async (page = 1, limit = 30): Promise<TodosResponse> => {
    const skip = (page - 1) * limit
    const response = await fetch(`${API_BASE}/todos?limit=${limit}&skip=${skip}`)
    if (!response.ok) {
      throw new Error("Failed to fetch todos")
    }
    return response.json()
  },

  // Create a new todo
  createTodo: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todos/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      throw new Error("Failed to create todo")
    }
    return response.json()
  },

  // Update a todo
  updateTodo: async (id: number, updates: UpdateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      throw new Error("Failed to update todo")
    }
    return response.json()
  },

  // Delete a todo
  deleteTodo: async (id: number): Promise<{ id: number; todo: string; completed: boolean; isDeleted: boolean }> => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete todo")
    }
    return response.json()
  },
}
