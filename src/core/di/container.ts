import { bindingScopeValues, Container } from 'inversify';
import { AuthApi } from '@/modules/auth/data/api/AuthApi';
import { AuthRepositoryImpl } from '@/modules/auth/data/repositories/AuthRepositoryImpl';
import { AuthRepository } from '@/modules/auth/domain/repositories/AuthRepository';
import { LoginUseCase } from '@/modules/auth/domain/usecases/LoginUseCase';
import { LoginViewModel } from '@/modules/auth/presentation/viewmodels/LoginViewModel';
import { AccountRepositoryImpl } from '@/modules/balance/data/repositories/AccountRepositoryImpl';
import { BalanceRepositoryImpl } from '@/modules/balance/data/repositories/BalanceRepositoryImpl';
import { AccountRepository } from '@/modules/balance/domain/repositories/AccountRepository';
import { BalanceRepository } from '@/modules/balance/domain/repositories/BalanceRepository';
import { GetAccountDetailUseCase } from '@/modules/balance/domain/usecases/GetAccountDetailUseCase';
import { GetAccountsUseCase } from '@/modules/balance/domain/usecases/GetAccountsUseCase';
import { AccountDetailViewModel } from '@/modules/balance/presentation/viewmodels/AccountDetailViewModel';
import { BalanceViewModel } from '@/modules/balance/presentation/viewmodels/BalanceViewModel';
import { CalendarViewModel } from '@/modules/calendar/presentation/viewmodels/CalendarViewModel';
import { CategoryRepositoryImpl } from '@/modules/categories/data/repositories/CategoryRepositoryImpl';
import { CategoryRepository } from '@/modules/categories/domain/repositories/CategoryRepository';
import { GetCategoriesUseCase } from '@/modules/categories/domain/usecases/GetCategoriesUseCase';
import { CategoryViewModel } from '@/modules/categories/presentation/viewmodels/CategoryViewModel';
import { ExpenseRepositoryImpl } from '@/modules/expenses/data/repositories/ExpenseRepositoryImpl';
import { ExpenseRepository } from '@/modules/expenses/domain/repositories/ExpenseRepository';
import { CreateExpenseUseCase } from '@/modules/expenses/domain/usecases/CreateExpenseUseCase';
import { PlanExpenseViewModel } from '@/modules/expenses/presentation/viewmodels/PlanExpenseViewModel';
import { GoalRepositoryImpl } from '@/modules/goals/data/repositories/GoalRepositoryImpl';
import { GoalRepository } from '@/modules/goals/domain/repositories/GoalRepository';
import { CreateGoalUseCase } from '@/modules/goals/domain/usecases/CreateGoalUseCase';
import { GetGoalsUseCase } from '@/modules/goals/domain/usecases/GetGoalsUseCase';
import { CreateGoalViewModel } from '@/modules/goals/presentation/viewmodels/CreateGoalViewModel';
import { GoalsViewModel } from '@/modules/goals/presentation/viewmodels/GoalsViewModel';
import { IncomeRepositoryImpl } from '@/modules/income/data/repositories/IncomeRepositoryImpl';
import { IncomeRepository } from '@/modules/income/domain/repositories/IncomeRepository';
import { CreateIncomeUseCase } from '@/modules/income/domain/usecases/CreateIncomeUseCase';
import { PlanIncomeViewModel } from '@/modules/income/presentation/viewmodels/PlanIncomeViewModel';
import { ProfileViewModel } from '@/modules/profile/presentation/viewmodels/ProfileViewModel';
import { AddAccountUseCase } from '@/modules/balance/domain/usecases/AddAccountUseCase';
import { AddAccountViewModel } from '@/modules/balance/presentation/viewmodels/AddAccountViewModel';

export const container = new Container({
    defaultScope: bindingScopeValues.Singleton,
    autobind: true
});


container.bind<CalendarViewModel>(CalendarViewModel).toResolvedValue(() => new CalendarViewModel());
container.bind<ExpenseRepository>(ExpenseRepository).toResolvedValue(() => new ExpenseRepositoryImpl());
container.bind<CreateExpenseUseCase>(CreateExpenseUseCase).toResolvedValue(() => new CreateExpenseUseCase(container.get(ExpenseRepository)));
container.bind<PlanExpenseViewModel>(PlanExpenseViewModel).toResolvedValue(() => new PlanExpenseViewModel(container.get(CreateExpenseUseCase)));
container.bind<CategoryRepository>(CategoryRepository).toResolvedValue(() => new CategoryRepositoryImpl());
container.bind<GetCategoriesUseCase>(GetCategoriesUseCase).toResolvedValue(() => new GetCategoriesUseCase(container.get(CategoryRepository)));
container.bind<CategoryViewModel>(CategoryViewModel).toResolvedValue(() => new CategoryViewModel(container.get(GetCategoriesUseCase)));
container.bind<IncomeRepository>(IncomeRepository).toResolvedValue(() => new IncomeRepositoryImpl());
container.bind<CreateIncomeUseCase>(CreateIncomeUseCase).toResolvedValue(() => new CreateIncomeUseCase(container.get(IncomeRepository)));
container.bind<PlanIncomeViewModel>(PlanIncomeViewModel).toResolvedValue(() => new PlanIncomeViewModel(container.get(CreateIncomeUseCase)));
container.bind<ProfileViewModel>(ProfileViewModel).toResolvedValue(() => new ProfileViewModel());
container.bind<AuthApi>(AuthApi).toSelf();
container.bind<AuthRepository>(AuthRepository).toResolvedValue(() => new AuthRepositoryImpl(container.get(AuthApi)))
container.bind<LoginUseCase>(LoginUseCase).toResolvedValue(() => new LoginUseCase(container.get(AuthRepository)));
container.bind<LoginViewModel>(LoginViewModel).toResolvedValue(() => new LoginViewModel(container.get(LoginUseCase)));
container.bind<GoalRepository>(GoalRepository).toResolvedValue(() => new GoalRepositoryImpl());
container.bind<GetGoalsUseCase>(GetGoalsUseCase).toResolvedValue(() => new GetGoalsUseCase(container.get(GoalRepository)));
container.bind<CreateGoalUseCase>(CreateGoalUseCase).toResolvedValue(() => new CreateGoalUseCase(container.get(GoalRepository)));
container.bind<GoalsViewModel>(GoalsViewModel).toResolvedValue(() => new GoalsViewModel(container.get(GetGoalsUseCase)));
container.bind<CreateGoalViewModel>(CreateGoalViewModel).toResolvedValue(() => new CreateGoalViewModel(container.get(CreateGoalUseCase)));
container.bind<BalanceRepository>(BalanceRepository).toResolvedValue(() => new BalanceRepositoryImpl());
container.bind<GetAccountsUseCase>(GetAccountsUseCase).toResolvedValue(() => new GetAccountsUseCase(container.get(BalanceRepository)));
container.bind<BalanceViewModel>(BalanceViewModel).toResolvedValue(() => new BalanceViewModel(container.get(GetAccountsUseCase)));



container.bind<AccountRepository>(AccountRepository).toResolvedValue(() => new AccountRepositoryImpl());
container.bind<GetAccountDetailUseCase>(GetAccountDetailUseCase).toResolvedValue(() => new GetAccountDetailUseCase(container.get(AccountRepository)));
container.bind<AccountDetailViewModel>(AccountDetailViewModel).toResolvedValue(() => new AccountDetailViewModel(container.get(GetAccountDetailUseCase)));
container.bind<AddAccountUseCase>(AddAccountUseCase).toResolvedValue(() => new AddAccountUseCase(container.get(AccountRepository)));
container.bind<AddAccountViewModel>(AddAccountViewModel).toResolvedValue(() => new AddAccountViewModel(container.get(AddAccountUseCase)));
