import { useQuery } from '@tanstack/react-query';
import { budgetService, categoryService } from '../services/api';
import type { Budget, Category } from '../types';

const Budgets = () => {
  const { data: budgets, isLoading: budgetsLoading } = useQuery<Budget[]>({
    queryKey: ['budgets'],
    queryFn: budgetService.getAll,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const isLoading = budgetsLoading || categoriesLoading;

  // Helper to get category name by id
  const getCategoryName = (categoryId: string) => {
    return categories?.find(c => c.id === categoryId)?.name || 'Неизвестная категория';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Бюджеты
      </h1>
      
      {budgets && budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <div key={budget.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {getCategoryName(budget.categoryId)}
                </h3>
                <span className="text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full">
                  {budget.period === 'monthly' ? 'Ежемесячно' : budget.period === 'weekly' ? 'Еженедельно' : 'Ежегодно'}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Лимит:</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{budget.limit.toFixed(2)} ₽</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Потрачено:</span>
                  <span className={`text-lg font-bold ${budget.spent > budget.limit ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}`}>
                    {budget.spent.toFixed(2)} ₽
                  </span>
                </div>
                
                {/* Прогресс бар */}
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="text-right">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        {Math.min((budget.spent / budget.limit) * 100, 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    <div 
                      style={{ width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        budget.spent > budget.limit ? 'bg-red-500' : 'bg-purple-500'
                      }`}
                    ></div>
                  </div>
                </div>
                
                {budget.spent > budget.limit && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    ⚠️ Превышен лимит на {(budget.spent - budget.limit).toFixed(2)} ₽
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-700">
          <span className="text-6xl mb-4 block">📊</span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Нет бюджетов</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Создайте свой первый бюджет для контроля расходов по категориям
          </p>
        </div>
      )}
    </div>
  );
};

export default Budgets;
