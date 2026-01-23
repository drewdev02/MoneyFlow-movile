import { Container } from 'inversify';
import { GoalRepositoryImpl } from '../data/repositories/GoalRepositoryImpl';
import { GoalRepository } from '../domain/repositories/GoalRepository';
import { GetGoalsUseCase } from '../domain/usecases/GetGoalsUseCase';
import { GoalsViewModel } from '../presentation/viewmodels/GoalsViewModel';

export const bindGoalsModule = (container: Container) => {
  container.bind<GoalRepository>(GoalRepository).toDynamicValue(() => new GoalRepositoryImpl()).inSingletonScope();
  container.bind<GetGoalsUseCase>(GetGoalsUseCase).toDynamicValue(() => new GetGoalsUseCase(container.get(GoalRepository))).inSingletonScope();
  container.bind<GoalsViewModel>(GoalsViewModel).toDynamicValue(() => new GoalsViewModel(container.get(GetGoalsUseCase))).inSingletonScope();
};
