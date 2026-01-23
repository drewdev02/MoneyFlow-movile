import { ContainerModule } from "inversify";
import { ExpenseRepositoryImpl } from "../data/repositories/ExpenseRepositoryImpl";
import { ExpenseRepository } from "../domain/repositories/ExpenseRepository";
import { CreateExpenseUseCase } from "../domain/usecases/CreateExpenseUseCase";
import { PlanExpenseViewModel } from "../presentation/viewmodels/PlanExpenseViewModel";

export const expensesModule = new ContainerModule((options) => {
    options.bind<ExpenseRepository>(ExpenseRepository).to(ExpenseRepositoryImpl);
    options.bind<CreateExpenseUseCase>(CreateExpenseUseCase).toDynamicValue((context) =>
        new CreateExpenseUseCase(context.get(ExpenseRepository))
    );
    options.bind<PlanExpenseViewModel>(PlanExpenseViewModel).toDynamicValue((context) =>
        new PlanExpenseViewModel(context.get(CreateExpenseUseCase))
    );
});
