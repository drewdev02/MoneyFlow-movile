import { Expense } from '../../models/Expense';
import { ExpenseRepository } from '../../repositories/ExpenseRepository';
import { CreateExpenseUseCase } from '../CreateExpenseUseCase';

describe('CreateExpenseUseCase', () => {
  let useCase: CreateExpenseUseCase;
  let repository: jest.Mocked<ExpenseRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn()
    } as any;
    useCase = new CreateExpenseUseCase(repository);
  });

  it('should call create with the expense', async () => {
    const expense: Omit<Expense, 'id'> = {
      category: 'food',
      amount: 100,
      currency: 'USD',
      date: new Date(),
      time: '12:00',
      name: 'Lunch',
      isPaid: true
    };
    const created: Expense = { ...expense, id: '1' };
    repository.create.mockResolvedValue(created);
    const result = await useCase.execute(expense);
    expect(repository.create).toHaveBeenCalledWith(expense);
    expect(result).toBe(created);
  });
});
