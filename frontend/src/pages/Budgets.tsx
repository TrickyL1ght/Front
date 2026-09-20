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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets?.map((budget) => {
          const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage > 80 && percentage <= 100;

          return (
            <div
              key={budget.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {getCategoryName(budget.categoryId)}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  budget.period === 'monthly' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : budget.period === 'weekly'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {budget.period === 'monthly' ? 'Месяц' : budget.period === 'weekly' ? 'Неделя' : 'Год'}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Потрачено</span>
                  <span className={`font-medium ${
                    isOverBudget 
                      ? 'text-red-600' 
                      : isNearLimit 
                      ? 'text-yellow-600' 
                      : 'text-green-600'
                  }`}>
                    {budget.spent.toFixed(2)} ₽ / {budget.limit.toFixed(2)} ₽
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverBudget 
                        ? 'bg-red-600' 
                        : isNearLimit 
                        ? 'bg-yellow-600' 
                        : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {percentage.toFixed(1)}% использовано
                  {isOverBudget && ` (Превышение на ${(percentage - 100).toFixed(1)}%)`}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Остаток</span>
                  <span className={`font-medium ${
                    budget.limit - budget.spent < 0 
                      ? 'text-red-600' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {(budget.limit - budget.spent).toFixed(2)} ₽
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {budgets?.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Нет бюджетов. Добавьте свой первый бюджет!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budgets;
