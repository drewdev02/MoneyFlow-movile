import { Transaction } from '../models/Transaction';

export abstract class TransactionRepository {
  abstract getById(id: string): Promise<Transaction | null>;
}
