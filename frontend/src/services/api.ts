import axios from 'axios';
import type { Transaction, Category, Budget, DashboardStats, ApiResponse } from '../types';

// Base API configuration - will be updated when backend is ready
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

// Transaction services
export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await api.get<ApiResponse<Transaction[]>>('/transactions');
    return response.data.data || [];
  },

  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    return response.data.data!;
  },

  create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const response = await api.post<ApiResponse<Transaction>>('/transactions', transaction);
    return response.data.data!;
  },

  update: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    const response = await api.put<ApiResponse<Transaction>>(`/transactions/${id}`, transaction);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};

// Category services
export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data || [];
  },

  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>('/categories', category);
    return response.data.data!;
  },

  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, category);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

// Budget services
export const budgetService = {
  getAll: async (): Promise<Budget[]> => {
    const response = await api.get<ApiResponse<Budget[]>>('/budgets');
    return response.data.data || [];
  },

  create: async (budget: Omit<Budget, 'id' | 'spent'>): Promise<Budget> => {
    const response = await api.post<ApiResponse<Budget>>('/budgets', budget);
    return response.data.data!;
  },

  update: async (id: string, budget: Partial<Budget>): Promise<Budget> => {
    const response = await api.put<ApiResponse<Budget>>(`/budgets/${id}`, budget);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/budgets/${id}`);
  },
};

// Dashboard services
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data!;
  },
};

export default api;
