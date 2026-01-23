import { Income } from '../models/Income';
import { IncomeRepository } from '../repositories/IncomeRepository';

export class CreateIncomeUseCase {
  constructor(
    private incomeRepository: IncomeRepository
  ) {}

  async execute(income: Omit<Income, 'id'>): Promise<Income> {
    return this.incomeRepository.create(income);
  }
}
