# DevoTel Todo Application Assessment

A modern, feature-rich todo application built with Next.js, TypeScript, and a comprehensive tech stack. This application demonstrates advanced state management, data fetching patterns, and user experience best practices.

## 🚀 Features

### Core Functionality
- **View Todos**: Display todos fetched from the DummyJSON API with pagination
- **Add Todos**: Create new todos with form validation using Zod
- **Delete Todos**: Remove todos with confirmation dialog to prevent accidental deletions
- **Toggle Status**: Mark todos as completed/incomplete with visual feedback
- **Drag & Drop**: Reorder todos using accessible drag and drop functionality

### Advanced Features
- **Pagination**: Navigate through todos with limit/skip parameters (30 items per page)
- **Optimistic Updates**: Immediate UI feedback with proper error handling
- **Skeleton Loading**: Smooth loading states during pagination
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark Mode**: Built-in theme switching capability

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) for predictable state updates
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query) for server state management
- **Validation**: [Zod](https://zod.dev/) for runtime type validation
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for utility-first styling
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for accessible components
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/) for accessible drag and drop
- **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography

## 📡 API Integration

This application integrates with the [DummyJSON Todos API](https://dummyjson.com/docs/todos):

- `GET /todos?limit=30&skip=0` - Fetch paginated todos
- `POST /todos/add` - Create new todo
- `PUT /todos/{id}` - Update todo status
- `DELETE /todos/{id}` - Delete todo

## 🏗️ Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── add-todo-form.tsx   # Todo creation form with validation
│   ├── delete-todo-dialog.tsx # Confirmation dialog for deletions
│   ├── draggable-todo-item.tsx # Drag and drop todo item
│   ├── pagination-controls.tsx # Pagination navigation
│   ├── providers.tsx       # Redux and React Query providers
│   ├── todo-app.tsx        # Main application component
│   ├── todo-item.tsx       # Individual todo item
│   ├── todo-list.tsx       # Todo list container
│   ├── todo-skeleton.tsx   # Loading skeleton components
│   └── todo-stats.tsx      # Todo statistics display
├── lib/
│   ├── api/
│   │   └── todos.ts        # API functions and types
│   ├── features/
│   │   └── todos/
│   │       └── todosSlice.ts # Redux slice for todos
│   ├── validations/
│   │   └── todo.ts         # Zod validation schemas
│   ├── hooks.ts            # Typed Redux hooks
│   ├── store.ts            # Redux store configuration
│   └── utils.ts            # Utility functions
└── hooks/
    ├── use-mobile.tsx      # Mobile detection hook
    └── use-toast.ts        # Toast notification hook
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

1. **Extract the repository**

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler check
```

## 🎯 Key Implementation Details

### State Management
- **Redux Toolkit** manages local state including drag order and optimistic updates
- **React Query** handles server state, caching, and background refetching
- Optimistic updates provide immediate feedback while API calls are in flight

### Data Fetching Strategy
- Paginated queries with `limit=30` and `skip` parameters
- Automatic cache invalidation on mutations
- Background refetching to keep data fresh
- Proper error handling with user feedback

### User Experience
- Skeleton loaders maintain layout during page transitions
- Confirmation dialogs prevent accidental data loss
- Toast notifications provide operation feedback
- Drag handles with visual feedback for reordering

### Accessibility
- Full keyboard navigation support
- Screen reader announcements for state changes
- ARIA labels and roles for interactive elements
- Focus management during modal interactions

## 🔧 Customization

### Styling
The application uses Tailwind CSS with custom design tokens. Modify `app/globals.css` to customize the color scheme and spacing.

### API Configuration
Update `lib/api/todos.ts` to change API endpoints or add authentication headers.

### Pagination
Adjust the `ITEMS_PER_PAGE` constant in `components/todo-app.tsx` to change page size.

## 📝 License

This project is built for assessment purposes.
