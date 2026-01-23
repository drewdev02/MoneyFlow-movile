import { CalendarViewModel } from '@/modules/calendar/presentation/viewmodels/CalendarViewModel';
import { CategoryRepositoryImpl } from '@/modules/categories/data/repositories/CategoryRepositoryImpl';
import { CategoryRepository } from '@/modules/categories/domain/repositories/CategoryRepository';
import { GetCategoriesUseCase } from '@/modules/categories/domain/usecases/GetCategoriesUseCase';
import { CategoryViewModel } from '@/modules/categories/presentation/viewmodels/CategoryViewModel';
import { ExpenseRepositoryImpl } from '@/modules/expenses/data/repositories/ExpenseRepositoryImpl';
import { ExpenseRepository } from '@/modules/expenses/domain/repositories/ExpenseRepository';
import { CreateExpenseUseCase } from '@/modules/expenses/domain/usecases/CreateExpenseUseCase';
import { PlanExpenseViewModel } from '@/modules/expenses/presentation/viewmodels/PlanExpenseViewModel';
import { Container } from 'inversify';

export const container = new Container({
     defaultScope: 'Singleton',
     autobind: true 
    });
container.bind<CalendarViewModel>(CalendarViewModel).toResolvedValue(() => new CalendarViewModel());
container.bind<ExpenseRepository>(ExpenseRepository).toResolvedValue(() => new ExpenseRepositoryImpl());
container.bind<CreateExpenseUseCase>(CreateExpenseUseCase).toResolvedValue(() => new CreateExpenseUseCase(container.get(ExpenseRepository)));
container.bind<PlanExpenseViewModel>(PlanExpenseViewModel).toResolvedValue(() => new PlanExpenseViewModel(container.get(CreateExpenseUseCase)));

container.bind<CategoryRepository>(CategoryRepository).toResolvedValue(() => new CategoryRepositoryImpl());
container.bind<GetCategoriesUseCase>(GetCategoriesUseCase).toResolvedValue(() => new GetCategoriesUseCase(container.get(CategoryRepository)));
container.bind<CategoryViewModel>(CategoryViewModel).toResolvedValue(() => new CategoryViewModel(container.get(GetCategoriesUseCase)));

