import { z } from "zod"

export const createTodoSchema = z.object({
  todo: z.string().min(1, "Todo title is required").max(200, "Todo title must be less than 200 characters").trim(),
})

export type CreateTodoInput = z.infer<typeof createTodoSchema>
