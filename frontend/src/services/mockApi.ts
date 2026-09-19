import type { Transaction, Category, Budget, DashboardStats } from '../types';

// Mock data for development
const mockTransactions: Transaction[] = [
  { id: '1', amount: 50000, category: 'Зарплата', description: 'Ежемесячная зарплата', date: '2024-01-15', type: 'income' },
  { id: '2', amount: 15000, category: 'Продукты', description: 'Покупки в супермаркете', date: '2024-01-14', type: 'expense' },
  { id: '3', amount: 3000, category: 'Транспорт', description: 'Заправка автомобиля', date: '2024-01-13', type: 'expense' },
  { id: '4', amount: 20000, category: 'Фриланс', description: 'Проект для клиента', date: '2024-01-12', type: 'income' },
  { id: '5', amount: 5000, category: 'Развлечения', description: 'Кино и ресторан', date: '2024-01-11', type: 'expense' },
  { id: '6', amount: 12000, category: 'Коммунальные услуги', description: 'Оплата счетов', date: '2024-01-10', type: 'expense' },
  { id: '7', amount: 8000, category: 'Здоровье', description: 'Визит к врачу', date: '2024-01-09', type: 'expense' },
  { id: '8', amount: 25000, category: 'Инвестиции', description: 'Дивиденды', date: '2024-01-08', type: 'income' },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Зарплата', type: 'income', icon: '💰' },
  { id: '2', name: 'Фриланс', type: 'income', icon: '💻' },
  { id: '3', name: 'Инвестиции', type: 'income', icon: '📈' },
  { id: '4', name: 'Продукты', type: 'expense', icon: '🛒' },
  { id: '5', name: 'Транспорт', type: 'expense', icon: '🚗' },
  { id: '6', name: 'Развлечения', type: 'expense', icon: '🎬' },
  { id: '7', name: 'Коммунальные услуги', type: 'expense', icon: '🏠' },
  { id: '8', name: 'Здоровье', type: 'expense', icon: '🏥' },
  { id: '9', name: 'Образование', type: 'expense', icon: '📚' },
  { id: '10', name: 'Одежда', type: 'expense', icon: '👕' },
];

const mockBudgets: Budget[] = [
  { id: '1', categoryId: '4', limit: 20000, spent: 15000, period: 'monthly' },
  { id: '2', categoryId: '5', limit: 5000, spent: 3000, period: 'monthly' },
  { id: '3', categoryId: '6', limit: 15000, spent: 12000, period: 'monthly' },
  { id: '4', categoryId: '7', limit: 10000, spent: 8000, period: 'monthly' },
  { id: '5', categoryId: '10', limit: 8000, spent: 4500, period: 'monthly' },
];

// Helper function to simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  transactions: {
    getAll: async (): Promise<Transaction[]> => {
      await delay();
      return [...mockTransactions];
    },
    getById: async (id: string): Promise<Transaction> => {
      await delay();
      const transaction = mockTransactions.find(t => t.id === id);
      if (!transaction) throw new Error('Transaction not found');
      return { ...transaction };
    },
    create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
      await delay();
      const newTransaction: Transaction = {
        ...transaction,
        id: String(Date.now()),
      };
      mockTransactions.unshift(newTransaction);
      return newTransaction;
    },
    update: async (id: string, updates: Partial<Transaction>): Promise<Transaction> => {
      await delay();
      const index = mockTransactions.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Transaction not found');
      mockTransactions[index] = { ...mockTransactions[index], ...updates };
      return mockTransactions[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      const index = mockTransactions.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Transaction not found');
      mockTransactions.splice(index, 1);
    },
  },

  categories: {
    getAll: async (): Promise<Category[]> => {
      await delay();
      return [...mockCategories];
    },
    create: async (category: Omit<Category, 'id'>): Promise<Category> => {
      await delay();
      const newCategory: Category = {
        ...category,
        id: String(Date.now()),
      };
      mockCategories.push(newCategory);
      return newCategory;
    },
    update: async (id: string, updates: Partial<Category>): Promise<Category> => {
      await delay();
      const index = mockCategories.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Category not found');
      mockCategories[index] = { ...mockCategories[index], ...updates };
      return mockCategories[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      const index = mockCategories.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Category not found');
      mockCategories.splice(index, 1);
    },
  },

  budgets: {
    getAll: async (): Promise<Budget[]> => {
      await delay();
      return [...mockBudgets];
    },
    create: async (budget: Omit<Budget, 'id' | 'spent'>): Promise<Budget> => {
      await delay();
      const newBudget: Budget = {
        ...budget,
        id: String(Date.now()),
        spent: 0,
      };
      mockBudgets.push(newBudget);
      return newBudget;
    },
    update: async (id: string, updates: Partial<Budget>): Promise<Budget> => {
      await delay();
      const index = mockBudgets.findIndex(b => b.id === id);
      if (index === -1) throw new Error('Budget not found');
      mockBudgets[index] = { ...mockBudgets[index], ...updates };
      return mockBudgets[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      const index = mockBudgets.findIndex(b => b.id === id);
      if (index === -1) throw new Error('Budget not found');
      mockBudgets.splice(index, 1);
    },
  },

  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      await delay();
      // Recalculate stats based on current transactions
      const income = mockTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = mockTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        totalBalance: income - expenses,
        totalIncome: income,
        totalExpenses: expenses,
        savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
      };
    },
  },
};
