import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

interface TodosState {
  items: Todo[]
  dragOrder: number[]
}

const initialState: TodosState = {
  items: [],
  dragOrder: [],
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload
      state.dragOrder = action.payload.map((todo) => todo.id)
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.unshift(action.payload)
      state.dragOrder.unshift(action.payload.id)
    },
    replaceOptimisticTodo: (state, action: PayloadAction<{ tempId: number; realTodo: Todo }>) => {
      const { tempId, realTodo } = action.payload
      const tempIndex = state.items.findIndex((todo) => todo.id === tempId)
      if (tempIndex !== -1) {
        state.items[tempIndex] = realTodo
        const dragIndex = state.dragOrder.findIndex((id) => id === tempId)
        if (dragIndex !== -1) {
          state.dragOrder[dragIndex] = realTodo.id
        }
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
      state.dragOrder = state.dragOrder.filter((id) => id !== action.payload)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    reorderTodos: (state, action: PayloadAction<number[]>) => {
      state.dragOrder = action.payload
    },
  },
})

export const { setTodos, addTodo, replaceOptimisticTodo, removeTodo, toggleTodo, reorderTodos } = todosSlice.actions
export default todosSlice.reducer
