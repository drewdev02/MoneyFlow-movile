import { Goal } from '../../models/Goal';
import { GoalRepository } from '../../repositories/GoalRepository';
import { CreateGoalUseCase } from '../CreateGoalUseCase';

describe('CreateGoalUseCase', () => {
  let useCase: CreateGoalUseCase;
  let repository: jest.Mocked<GoalRepository>;

  beforeEach(() => {
    repository = {
      createGoal: jest.fn()
    } as any;
    useCase = new CreateGoalUseCase(repository);
  });

  it('should call createGoal with the goal', async () => {
    const goal: Omit<Goal, 'id'> = {
      name: 'Test',
      targetAmount: 1000,
      currentAmount: 100,
      icon: 'star',
      color: '#fff',
      category: 'savings',
      date: '2026-01-23',
      notes: 'Test note',
      imageUrl: undefined
    };
    repository.createGoal.mockResolvedValue(undefined);
    await useCase.execute(goal);
    expect(repository.createGoal).toHaveBeenCalledWith(goal);
  });
});
