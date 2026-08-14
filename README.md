# DevBoard

A modern, responsive project and task management dashboard built with React.

DevBoard started as a React learning project and evolved into a complete frontend application focused on **component architecture, state management, CRUD workflows, lifecycle consistency, persistence, responsive UI, accessibility, and production-ready development practices**.

> **React Phase Capstone — Completed**

---

## ✨ Features

### Dashboard
- Workspace overview with project and task metrics
- Project progress visualization
- Task distribution chart
- Recent projects
- Upcoming tasks
- Recent development activity

### Projects
- Create projects
- Edit project details
- Track project status and priority
- Dynamic progress based on associated tasks
- Technology tags
- Archive projects
- Move projects to Trash
- Restore projects
- Permanently delete projects

### Tasks
- Create and edit tasks
- Assign tasks to projects
- Status and priority management
- Due dates
- Search, filtering and sorting
- Responsive task cards/table
- Archive, Trash, Restore and permanent deletion

### Lifecycle Management
DevBoard uses a deliberate lifecycle model:

```text
Active
  ├──→ Archive ──→ Restore ──→ Active
  │
  └──→ Trash ────→ Restore ──→ Active
                     │
                     └──────→ Permanent Delete
```

Project and task lifecycles are coordinated so that restoring a project does not incorrectly overwrite a task's previous state.

For example, if one task was manually archived before its project entered Trash, restoring the project keeps that task archived while other active tasks return to Active.

### Persistence
- Projects persist across refreshes
- Tasks persist across refreshes
- Activity history persists across refreshes
- Authentication state persists across refreshes
- Storage access is isolated through utility functions

### UI / UX
- Responsive mobile, tablet and desktop layouts
- Reusable UI components
- Accessible icon actions
- Tooltips/labels for icon buttons
- Confirmation flows for destructive operations
- Empty states
- Loading/error-friendly architecture
- Motion-based page and component transitions
- Responsive task card/table presentation

---

## 🏗️ Architecture

DevBoard follows a **feature-oriented React architecture with centralized application state**.

```text
src/
├── auth/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   ├── ProtectedRoute.jsx
│   └── useAuth.js
│
├── components/
│   ├── activity/
│   ├── archive/
│   ├── dashboard/
│   ├── layout/
│   ├── motion/
│   ├── projects/
│   ├── tasks/
│   ├── trash/
│   └── ui/
│
├── context/
│   └── AppDataContext.js
│
├── data/
│   ├── activities.js
│   ├── projects.js
│   └── tasks.js
│
├── hooks/
│   ├── useAppData.js
│   └── useTaskFilters.js
│
├── pages/
│   ├── ActivityPage.jsx
│   ├── ArchivePage.jsx
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   ├── ProjectsPage.jsx
│   ├── TasksPage.jsx
│   └── TrashPage.jsx
│
├── providers/
│   └── AppDataProvider.jsx
│
└── utils/
    ├── activityFactory.js
    ├── date.js
    ├── motion.js
    ├── projectFactory.js
    ├── projectFilters.js
    ├── projectStats.js
    ├── projectValidation.js
    ├── storage.js
    ├── taskFactory.js
    ├── taskFilters.js
    ├── taskValidation.js
    └── user.js
```

### Application data flow

```text
User Action
    ↓
Page / Feature Component
    ↓
AppDataContext
    ↓
AppDataProvider
    ↓
State Mutation
    ↓
Derived Data
    ↓
UI Re-render
    ↓
LocalStorage Persistence
```

The provider owns application-level mutations while feature components primarily render state and communicate user intent.

---

## 🧠 Key Engineering Decisions

### Centralized application state

Projects, tasks and activities are application-level data, so they are managed through `AppDataProvider`.

This prevents different pages from maintaining competing copies of the same data.

### Derived data instead of duplicated state

Project progress is calculated from tasks instead of storing a hard-coded percentage.

This means:

```text
Task completion changes
        ↓
Project statistics update
        ↓
Project progress updates
        ↓
Dashboard chart updates
```

There is one source of truth.

### Lifecycle consistency

Project lifecycle changes also consider associated tasks.

The application preserves the previous task lifecycle when a project is moved to Trash and restored.

This prevents accidental state changes and orphaned task records.

### LocalStorage as a persistence boundary

The React application treats LocalStorage as the persistence layer rather than scattering `localStorage` calls throughout components.

This keeps persistence isolated and makes a future API/database migration easier.

### Avoiding unnecessary abstraction

The application deliberately does not introduce a global state library, reducer architecture, or aggressive memoization without a demonstrated need.

The goal is maintainable code, not maximum abstraction.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI and application architecture |
| React Router | Client-side routing |
| Vite | Development server and production build |
| Tailwind CSS | Styling and responsive layouts |
| Motion | UI/page animations |
| React Icons | Interface icons |
| Recharts | Dashboard charts |
| ESLint | Code quality |
| LocalStorage | Client-side persistence |

---

## 📱 Responsive Design

The interface is designed for:

- Mobile
- Large mobile
- Tablet
- Desktop
- Large desktop

Examples:

### Tasks

```text
Small screens
    ↓
Task Cards

Large screens
    ↓
Task Table
```

Filters and action controls adapt to available screen width rather than forcing a fixed desktop layout.

### Projects

Project cards use responsive grids and flexible headers so actions, status badges, descriptions, technologies and progress remain readable on smaller screens.

---

## 🔐 Authentication

DevBoard currently uses a **demo client-side authentication flow**.

Authentication state is stored locally and protected routes prevent unauthenticated access to the main application.

### Important

This authentication implementation is intentionally suitable for a frontend demo/learning project.

It is **not production authentication** because credentials and authentication state are handled client-side.

A production version should use:

- Backend authentication
- Password hashing
- Secure sessions or appropriately handled tokens
- Server-side authorization
- Input validation
- Secure cookie/session strategy

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd DevBoard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite.

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Serves the production build locally for verification.

---

## 🧪 Quality Verification

The final React-phase audit covered:

- React architecture
- State management
- CRUD operations
- Project/task lifecycle consistency
- Archive and Trash workflows
- Restore behavior
- Permanent deletion
- Dynamic project progress
- Dashboard statistics
- Activity tracking
- LocalStorage persistence
- Responsive layouts
- Accessibility
- Component architecture
- Console/runtime issues
- ESLint
- Production build

Final verification:

```text
ESLint      → PASS
Build       → PASS
Functional  → PASS
Responsive  → PASS
Lifecycle   → PASS
Persistence → PASS
```

---

## 📊 Project Lifecycle Example

A project with two active tasks:

```text
Project
├── Task A → Active
└── Task B → Active
```

Archive and restore:

```text
Project → Archive
├── Task A → Archived
└── Task B → Archived

Project → Restore
├── Task A → Active
└── Task B → Active
```

If Task B is manually archived before the project enters Trash:

```text
Before Trash
├── Task A → Active
└── Task B → Archived

Project → Trash
        ↓
Project → Restore

After Restore
├── Task A → Active
└── Task B → Archived
```

This behavior preserves user intent.

---

## 🎯 What This Project Demonstrates

DevBoard demonstrates practical React engineering beyond basic component tutorials:

- Component composition
- Context-based state management
- Custom hooks
- Derived state
- CRUD workflows
- Domain lifecycle modeling
- State synchronization
- Local persistence
- Responsive design
- Accessibility
- Reusable UI architecture
- Data filtering and sorting
- Dashboard data visualization
- Error-resistant state updates
- Production build validation
- Refactoring and code review
- Engineering trade-offs

---

## 🔮 Future Evolution

The current application intentionally stops at the frontend/persistence boundary.

A future full-stack version could evolve into:

```text
React
   ↓
REST API
   ↓
Express / Node.js
   ↓
Database
```

Potential additions:

- User accounts
- Server-side authentication
- Authorization
- Persistent database storage
- REST API
- Server-side validation
- API error/loading states
- Automated tests
- Deployment
- Observability
- Multi-user collaboration

The current component and feature architecture is designed so this evolution can happen incrementally instead of requiring a complete frontend rewrite.

---

## 📚 Project Documentation

For a detailed explanation of the architecture, engineering decisions, lifecycle model, final audit and senior-developer walkthrough, see:

**DevBoard Complete Phase Documentation**

The documentation covers both the technical implementation and the reasoning behind the major architectural decisions.

---

## 👨‍💻 Project Status

**React Phase: Completed**

DevBoard has completed its React-phase development and final audit.

Further changes should be driven by genuine bugs, new requirements or measurable performance needs rather than refactoring for its own sake.

---

## 📄 License

This project is intended as a personal learning and portfolio project.
