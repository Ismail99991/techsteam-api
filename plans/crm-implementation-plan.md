# CRM Implementation Plan

## Overview
Create a full CRM frontend at `C:\Users\zairo\brox-web` that interacts with the BROX API at `http://localhost:3001/api`.

## Part 1: API Enhancements (brox-api)

### 1.1 JWT Authentication
- **File:** `src/modules/auth/auth.service.js`
  - Import `jsonwebtoken`
  - On successful login, generate JWT with `{ userId, email, role }` payload
  - Return `{ ok: true, token, user: { id, email } }`
- **File:** `src/modules/auth/auth.controller.js`
  - Update response to include token and user data
- **File:** `src/modules/auth/auth.routes.js`
  - Add `router.get("/me", authMiddleware, controller.getMe)` endpoint
- **File:** `src/modules/auth/auth.middleware.js` (new)
  - Extract Bearer token from Authorization header
  - Verify JWT, attach `req.user` to request
  - Export as `authMiddleware`

### 1.2 User CRUD
- **File:** `src/modules/users/users.routes.js` (new)
  - `GET /api/users` — list all users
  - `GET /api/users/:id` — get user by ID
  - `POST /api/users` — create user
  - `PUT /api/users/:id` — update user
  - `DELETE /api/users/:id` — delete user
- **File:** `src/modules/users/users.controller.js` (new)
  - Standard CRUD controller methods
- **File:** `src/modules/users/users.service.js` (new)
  - Prisma queries for User model
  - Hash password on create/update
- **File:** `src/app.js`
  - Register user routes: `app.use("/api/users", usersRoutes)`

### 1.3 Auth Middleware Integration
- Apply `authMiddleware` to protected routes:
  - Admin routes (`/api/admin/*`)
  - Orders routes (`/api/orders/*`)
  - Users routes (`/api/users/*`)
  - Events routes (`GET /api/events`, `GET /api/events/stats`)

## Part 2: CRM Frontend (brox-web)

### 2.1 Project Setup
- **Stack:** React 18 + TypeScript + Vite
- **Dependencies:** react-router-dom, axios, recharts (for dashboard charts)
- **Dev Dependencies:** @types/react, @types/react-dom, typescript, vite, @vitejs/plugin-react

### 2.2 Project Structure
```
brox-web/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── api/
│   │   └── client.ts          # Axios instance with interceptors
│   ├── context/
│   │   └── AuthContext.tsx     # Auth state management
│   ├── components/
│   │   ├── Layout.tsx          # Sidebar + Header layout
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Header.tsx          # Top header with user info
│   │   └── ProtectedRoute.tsx  # Route guard
│   ├── pages/
│   │   ├── LoginPage.tsx       # Login form
│   │   ├── DashboardPage.tsx   # Dashboard with stats/charts
│   │   ├── UsersPage.tsx       # User management (list)
│   │   ├── UserFormPage.tsx    # Create/Edit user
│   │   ├── OrdersPage.tsx      # Order management (list)
│   │   ├── OrderDetailPage.tsx # Order detail + status change
│   │   └── SettingsPage.tsx    # Settings page
│   └── types/
│       └── index.ts            # TypeScript interfaces
```

### 2.3 Pages & Features

#### LoginPage
- Email + password form
- Calls `POST /api/auth/login`
- Stores JWT token in localStorage
- Redirects to Dashboard on success

#### DashboardPage
- Stats cards: Total Users, Total Orders, Total Products, Revenue
- Calls: `GET /api/metrics/stats` (or aggregate from orders)
- Order status distribution chart (recharts PieChart)
- Recent orders table (last 5)
- Recent events list

#### UsersPage
- Table with all users (id, email, createdAt)
- Actions: Edit, Delete
- "Add User" button → UserFormPage
- Calls: `GET /api/users`, `DELETE /api/users/:id`

#### UserFormPage
- Form: email, password
- Create mode: `POST /api/users`
- Edit mode: `PUT /api/users/:id`
- Redirect to UsersPage on success

#### OrdersPage
- Table with all orders (id, user email, status, total, date)
- Click row → OrderDetailPage
- Status badge with color coding
- Calls: `GET /api/orders`

#### OrderDetailPage
- Full order info with items list
- Status change dropdown (with allowed transitions)
- Delete button
- Calls: `GET /api/orders/:id`, `PUT /api/orders/:id/status`, `DELETE /api/orders/:id`

#### SettingsPage
- Placeholder for future settings
- Display API connection status
- Display current user info

### 2.4 Navigation (React Router)
```
/login          → LoginPage
/               → DashboardPage (protected)
/users          → UsersPage (protected)
/users/new      → UserFormPage (protected)
/users/:id/edit → UserFormPage (protected)
/orders         → OrdersPage (protected)
/orders/:id     → OrderDetailPage (protected)
/settings       → SettingsPage (protected)
```

### 2.5 Axios Client Configuration
- Base URL: `http://localhost:3001/api`
- Request interceptor: attach `Authorization: Bearer <token>` header
- Response interceptor: on 401, redirect to `/login`

### 2.6 Auth Context
- `AuthProvider` wrapping the app
- Provides: `user`, `token`, `login()`, `logout()`, `isAuthenticated`
- On mount, check localStorage for existing token
- `login()` calls API, stores token, sets user state

## Implementation Order
1. API: JWT auth enhancement
2. API: User CRUD module
3. API: Auth middleware on protected routes
4. Frontend: Project scaffolding (Vite + deps)
5. Frontend: Types, API client, Auth context
6. Frontend: Layout (Sidebar + Header)
7. Frontend: Login page
8. Frontend: Dashboard page
9. Frontend: Users pages (list + form)
10. Frontend: Orders pages (list + detail)
11. Frontend: Settings page
12. Frontend: Protected routes & navigation