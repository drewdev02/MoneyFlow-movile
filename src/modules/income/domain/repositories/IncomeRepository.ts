import { Income } from '../models/Income';

export abstract class IncomeRepository {
  abstract create(income: Omit<Income, 'id'>): Promise<Income>;
  abstract getAll(): Promise<Income[]>;
}
