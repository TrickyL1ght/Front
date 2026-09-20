// Types for the home finance application

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

// Backend API response format for transactions
export interface BackendTransaction {
  Id: number;
  Transaction_type: string;
  Amount: number;
  Category: string;
  Description: string;
  Date: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
