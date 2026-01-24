import { makeAutoObservable, runInAction } from 'mobx';
import { GetTransactionByIdUseCase } from '../../domain/usecases/GetTransactionByIdUseCase';
import { Transaction } from '../../domain/models/Transaction';

export class TransactionDetailViewModel {
  loading = false;
  transaction: Transaction | null = null;
  error: string | null = null;

  constructor(private readonly getTransactionById: GetTransactionByIdUseCase) {
    makeAutoObservable(this);
  }

  async loadTransaction(id: string) {
    this.loading = true;
    this.error = null;
    try {
      const tx = await this.getTransactionById.execute(id);
      runInAction(() => {
        this.transaction = tx;
        this.loading = false;
        this.error = !tx ? 'Transaction not found' : null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Failed to load transaction';
        this.transaction = null;
        this.loading = false;
      });
    }
  }
}
