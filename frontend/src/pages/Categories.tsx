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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Доходы */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📈</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Доходы</h2>
          </div>
          
          {incomeCategories.length > 0 ? (
            <div className="space-y-3">
              {incomeCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon || '💰'}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">Нет категорий доходов</p>
          )}
        </div>

        {/* Расходы */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📉</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Расходы</h2>
          </div>
          
          {expenseCategories.length > 0 ? (
            <div className="space-y-3">
              {expenseCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon || '💸'}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">Нет категорий расходов</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
