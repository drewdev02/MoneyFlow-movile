import { Expense } from '../../domain/models/Expense';
import { ExpenseRepository } from '../../domain/repositories/ExpenseRepository';

export class ExpenseRepositoryImpl extends ExpenseRepository {
  private expenses: Expense[] = [];

  async create(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const newExpense: Expense = {
      ...expense,
      id: Math.random().toString(36).substring(7),
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  async getAll(): Promise<Expense[]> {
    return this.expenses;
  }
}
