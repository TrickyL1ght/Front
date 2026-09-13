# FinanceTracker Frontend

A modern React-based frontend application for tracking personal finances. Built with Vite, TypeScript, and TailwindCSS.

## Features

- **Dashboard** - View your financial overview with balance, income, expenses, and savings rate
- **Transactions** - Add, edit, and delete income/expense transactions
- **Budgets** - Track spending against budgets (ready for backend integration)
- **Categories** - Manage transaction categories (ready for backend integration)
- **Authentication** - Login/Register with JWT token support
- **Dark Mode** - Automatic dark mode support based on system preferences
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your Go backend URL:
```
VITE_API_URL=http://localhost:8080/api
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── TransactionForm.tsx
│   └── ProtectedRoute.tsx
├── context/          # React contexts
│   └── AuthContext.tsx
├── hooks/            # Custom React hooks
├── pages/            # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Transactions.tsx
│   ├── Budgets.tsx
│   └── Categories.tsx
├── services/         # API services
│   └── api.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main app component
├── main.tsx          # App entry point
└── index.css         # Global styles
```

## Backend Integration

This frontend is designed to work with a Go backend. The API service layer (`src/services/api.ts`) is already configured with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Expected Response Format

All API responses should follow this format:

```json
{
  "data": { ... },
  "error": "",
  "message": ""
}
```

For authentication endpoints:

```json
{
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "currency": "USD"
    }
  }
}
```

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
