import { TodoApp } from "@/components/todo-app"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Todo Application</h1>
          <TodoApp />
        </div>
      </div>
    </main>
  )
}
