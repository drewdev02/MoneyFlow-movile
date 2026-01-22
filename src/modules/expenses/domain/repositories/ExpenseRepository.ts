import { Expense } from '../models/Expense';

export abstract class ExpenseRepository {
  abstract create(expense: Omit<Expense, 'id'>): Promise<Expense>;
  abstract getAll(): Promise<Expense[]>;
}
