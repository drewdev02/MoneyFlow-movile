import { Income } from '../../models/Income';
import { IncomeRepository } from '../../repositories/IncomeRepository';
import { CreateIncomeUseCase } from '../CreateIncomeUseCase';

describe('CreateIncomeUseCase', () => {
  let useCase: CreateIncomeUseCase;
  let repository: jest.Mocked<IncomeRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn()
    } as any;
    useCase = new CreateIncomeUseCase(repository);
  });

  it('should call create with the income', async () => {
    const income: Omit<Income, 'id'> = {
      category: 'salary',
      amount: 100,
      currency: 'USD',
      date: new Date(),
      time: '12:00',
      name: 'Salary',
      isPaid: true,
      notes: 'Monthly',
      repeat: 'monthly',
      remind: 'none',
      goalOrDebt: undefined
    };
    const created: Income = { ...income, id: '1' };
    repository.create.mockResolvedValue(created);
    const result = await useCase.execute(income);
    expect(repository.create).toHaveBeenCalledWith(income);
    expect(result).toBe(created);
  });
});
