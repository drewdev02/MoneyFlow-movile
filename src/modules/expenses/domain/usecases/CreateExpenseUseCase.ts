import { Expense } from '../models/Expense';
import { ExpenseRepository } from '../repositories/ExpenseRepository';

export class CreateExpenseUseCase {
  constructor(
 private expenseRepository: ExpenseRepository
  ) {}

  async execute(expense: Omit<Expense, 'id'>): Promise<Expense> {
    return this.expenseRepository.create(expense);
  }
}
