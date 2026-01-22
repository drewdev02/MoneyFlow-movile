import { inject, injectable } from 'inversify';
import { Expense } from '../models/Expense';
import { ExpenseRepository } from '../repositories/ExpenseRepository';

@injectable()
export class CreateExpenseUseCase {
  constructor(
 private expenseRepository: ExpenseRepository
  ) {}

  async execute(expense: Omit<Expense, 'id'>): Promise<Expense> {
    return this.expenseRepository.create(expense);
  }
}
