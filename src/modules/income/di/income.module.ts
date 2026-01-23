import { ContainerModule } from "inversify";
import { IncomeRepositoryImpl } from "../data/repositories/IncomeRepositoryImpl";
import { IncomeRepository } from "../domain/repositories/IncomeRepository";
import { CreateIncomeUseCase } from "../domain/usecases/CreateIncomeUseCase";
import { PlanIncomeViewModel } from "../presentation/viewmodels/PlanIncomeViewModel";

export const incomeModule = new ContainerModule((options) => {
    options.bind<IncomeRepository>(IncomeRepository).to(IncomeRepositoryImpl);
    options.bind<CreateIncomeUseCase>(CreateIncomeUseCase).toDynamicValue((context) =>
        new CreateIncomeUseCase(context.get(IncomeRepository))
    );
    options.bind<PlanIncomeViewModel>(PlanIncomeViewModel).toDynamicValue((context) =>
        new PlanIncomeViewModel(context.get(CreateIncomeUseCase))
    );
});
