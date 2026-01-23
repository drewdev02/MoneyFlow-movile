import { inject, injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
import { AccountDetail } from "../../domain/models/AccountDetail";
import { GetAccountDetailUseCase } from "../../domain/usecases/GetAccountDetailUseCase";

@injectable()
export class AccountDetailViewModel {
    account: AccountDetail | null = null;
    loading: boolean = false;
    error: string | null = null;

    constructor(private getAccountDetailUseCase: GetAccountDetailUseCase) {
        makeAutoObservable(this);
    }

    async loadAccount(id: string) {
        this.loading = true;
        this.error = null;
        try {
            const result = await this.getAccountDetailUseCase.execute(id);
            runInAction(() => {
                this.account = result;
            });
        } catch (e) {
            runInAction(() => {
                this.error = "Failed to load account details";
            });
            console.error(e);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}
