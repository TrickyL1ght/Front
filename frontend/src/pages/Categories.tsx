import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/api';
import type { Category } from '../types';

const Categories = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const incomeCategories = categories?.filter(c => c.type === 'income') || [];
  const expenseCategories = categories?.filter(c => c.type === 'expense') || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Категории
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Управление категориями скоро появится. Подключите ваш Go бэкенд для включения этой функции.
        </p>
      </div>
    </div>
  );
};

export default Categories;
