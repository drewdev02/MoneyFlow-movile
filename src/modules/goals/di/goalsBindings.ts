import { Container } from 'inversify';
import { GoalRepositoryImpl } from '../data/repositories/GoalRepositoryImpl';
import { GoalRepository } from '../domain/repositories/GoalRepository';
import { CreateGoalUseCase } from '../domain/usecases/CreateGoalUseCase';
import { GetGoalsUseCase } from '../domain/usecases/GetGoalsUseCase';
import { CreateGoalViewModel } from '../presentation/viewmodels/CreateGoalViewModel';
import { GoalsViewModel } from '../presentation/viewmodels/GoalsViewModel';

export const bindGoalsModule = (container: Container) => {
  container.bind<GoalRepository>(GoalRepository).toDynamicValue(() => new GoalRepositoryImpl()).inSingletonScope();
  
  container.bind<GetGoalsUseCase>(GetGoalsUseCase).toDynamicValue(() => new GetGoalsUseCase(container.get(GoalRepository))).inSingletonScope();
  container.bind<CreateGoalUseCase>(CreateGoalUseCase).toDynamicValue(() => new CreateGoalUseCase(container.get(GoalRepository))).inSingletonScope();
  
  container.bind<GoalsViewModel>(GoalsViewModel).toDynamicValue(() => new GoalsViewModel(container.get(GetGoalsUseCase))).inSingletonScope();
  container.bind<CreateGoalViewModel>(CreateGoalViewModel).toDynamicValue(() => new CreateGoalViewModel(container.get(CreateGoalUseCase))).inSingletonScope();
};
