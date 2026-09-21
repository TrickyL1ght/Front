import axios from 'axios';
import type { Transaction, Category, Budget, DashboardStats, ApiResponse, BackendTransaction } from '../types';
import { mockApi } from './mockApi';

// Check if mock API is enabled
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// Helper to choose between mock and real API
const useMock = () => USE_MOCK_API;

// Helper function to convert backend transaction format to frontend format
const mapBackendTransaction = (backend: BackendTransaction): Transaction => ({
  id: String(backend.Id),
  amount: backend.Amount,
  category: backend.Category,
  description: backend.Description,
  date: backend.Date,
  type: backend.Transaction_type === 'Доход' ? 'income' : 'expense',
});

// Transaction services
export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    if (useMock()) {
      return mockApi.transactions.getAll();
    }
    const response = await api.get<BackendTransaction[]>('/transaction');
    return response.data.map(mapBackendTransaction);
  },

  getById: async (id: string): Promise<Transaction> => {
    if (useMock()) {
      return mockApi.transactions.getById(id);
    }
    const response = await api.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    return response.data.data!;
  },

  create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    if (useMock()) {
      return mockApi.transactions.create(transaction);
    }
    const response = await api.post<ApiResponse<Transaction>>('/transactions', transaction);
    return response.data.data!;
  },

  update: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    if (useMock()) {
      return mockApi.transactions.update(id, transaction);
    }
    const response = await api.put<ApiResponse<Transaction>>(`/transactions/${id}`, transaction);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    if (useMock()) {
      return mockApi.transactions.delete(id);
    }
    await api.delete(`/transactions/${id}`);
  },
};

// Category services
export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    if (useMock()) {
      return mockApi.categories.getAll();
    }
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data || [];
  },

  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    if (useMock()) {
      return mockApi.categories.create(category);
    }
    const response = await api.post<ApiResponse<Category>>('/categories', category);
    return response.data.data!;
  },

  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    if (useMock()) {
      return mockApi.categories.update(id, category);
    }
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, category);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    if (useMock()) {
      return mockApi.categories.delete(id);
    }
    await api.delete(`/categories/${id}`);
  },
};

// Budget services
export const budgetService = {
  getAll: async (): Promise<Budget[]> => {
    if (useMock()) {
      return mockApi.budgets.getAll();
    }
    const response = await api.get<ApiResponse<Budget[]>>('/budgets');
    return response.data.data || [];
  },

  create: async (budget: Omit<Budget, 'id' | 'spent'>): Promise<Budget> => {
    if (useMock()) {
      return mockApi.budgets.create(budget);
    }
    const response = await api.post<ApiResponse<Budget>>('/budgets', budget);
    return response.data.data!;
  },

  update: async (id: string, budget: Partial<Budget>): Promise<Budget> => {
    if (useMock()) {
      return mockApi.budgets.update(id, budget);
    }
    const response = await api.put<ApiResponse<Budget>>(`/budgets/${id}`, budget);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    if (useMock()) {
      return mockApi.budgets.delete(id);
    }
    await api.delete(`/budgets/${id}`);
  },
};

// Dashboard services
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    if (useMock()) {
      return mockApi.dashboard.getStats();
    }
    const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data!;
  },
};

export default api;
