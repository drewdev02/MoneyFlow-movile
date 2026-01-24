import { TransactionRepository } from '../repositories/TransactionRepository';
import { Transaction } from '../models/Transaction';

export class GetTransactionByIdUseCase {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async execute(id: string): Promise<Transaction | null> {
    return this.transactionRepo.getById(id);
  }
}
