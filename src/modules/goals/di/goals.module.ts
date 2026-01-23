import { ContainerModule } from "inversify";
import { GoalRepositoryImpl } from "../data/repositories/GoalRepositoryImpl";
import { GoalRepository } from "../domain/repositories/GoalRepository";
import { CreateGoalUseCase } from "../domain/usecases/CreateGoalUseCase";
import { GetGoalsUseCase } from "../domain/usecases/GetGoalsUseCase";
import { CreateGoalViewModel } from "../presentation/viewmodels/CreateGoalViewModel";
import { GoalsViewModel } from "../presentation/viewmodels/GoalsViewModel";

export const goalsModule = new ContainerModule((options) => {
    options.bind<GoalRepository>(GoalRepository).to(GoalRepositoryImpl);
    options.bind<GetGoalsUseCase>(GetGoalsUseCase).toDynamicValue((context) =>
        new GetGoalsUseCase(context.get(GoalRepository))
    );
    options.bind<CreateGoalUseCase>(CreateGoalUseCase).toDynamicValue((context) =>
        new CreateGoalUseCase(context.get(GoalRepository))
    );
    options.bind<GoalsViewModel>(GoalsViewModel).toDynamicValue((context) =>
        new GoalsViewModel(context.get(GetGoalsUseCase))
    );
    options.bind<CreateGoalViewModel>(CreateGoalViewModel).toDynamicValue((context) =>
        new CreateGoalViewModel(context.get(CreateGoalUseCase))
    );
});
