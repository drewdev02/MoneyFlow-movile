import { makeAutoObservable, runInAction } from "mobx";
import { Account } from "../../domain/models/Account";
import { GetAccountsUseCase } from "../../domain/usecases/GetAccountsUseCase";

export class BalanceViewModel {
    accounts: Account[] = [];
    loading = false;
    error = '';
    totalBalance = 0;

    constructor(private getAccountsUseCase: GetAccountsUseCase) {
        makeAutoObservable(this);
    }

    async loadData() {
        this.loading = true;
        this.error = '';
        try {
            const accounts = await this.getAccountsUseCase.execute();
            
            runInAction(() => {
                this.accounts = accounts;
                this.totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
            });
        } catch (e: any) {
             runInAction(() => {
                this.error = e.message || 'Failed to load balance data';
            });
        } finally {
             runInAction(() => {
                this.loading = false;
            });
        }
    }
}
