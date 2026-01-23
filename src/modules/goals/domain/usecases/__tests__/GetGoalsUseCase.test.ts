import { Goal } from '../../models/Goal';
import { GoalRepository } from '../../repositories/GoalRepository';
import { GetGoalsUseCase } from '../GetGoalsUseCase';

describe('GetGoalsUseCase', () => {
  let useCase: GetGoalsUseCase;
  let repository: jest.Mocked<GoalRepository>;

  beforeEach(() => {
    repository = {
      getGoals: jest.fn()
    } as any;
    useCase = new GetGoalsUseCase(repository);
  });

  it('should return goals from repository', async () => {
    const goals: Goal[] = [
      {
        id: '1',
        name: 'Save',
        targetAmount: 1000,
        currentAmount: 100,
        icon: 'star',
        color: '#fff',
        category: 'savings',
        date: '2026-01-23',
        notes: 'Test note',
        imageUrl: undefined
      }
    ];
    repository.getGoals.mockResolvedValue(goals);
    const result = await useCase.execute();
    expect(result).toBe(goals);
  });
});
