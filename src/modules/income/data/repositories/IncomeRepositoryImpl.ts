import { Income } from '../../domain/models/Income';
import { IncomeRepository } from '../../domain/repositories/IncomeRepository';

export class IncomeRepositoryImpl extends IncomeRepository {
  private incomes: Income[] = [];

  async create(income: Omit<Income, 'id'>): Promise<Income> {
    const newIncome: Income = {
      ...income,
      id: Math.random().toString(36).substring(7),
    };
    this.incomes.push(newIncome);
    return newIncome;
  }

  async getAll(): Promise<Income[]> {
    return this.incomes;
  }
}
