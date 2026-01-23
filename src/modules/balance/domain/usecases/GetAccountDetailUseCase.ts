import { AccountRepository } from "../../domain/repositories/AccountRepository";
import { AccountDetail } from "../../domain/models/AccountDetail";

export class GetAccountDetailUseCase {
    constructor(
      private repository: AccountRepository
    ) {}

    async execute(accountId: string): Promise<AccountDetail> {
        return this.repository.getAccountDetail(accountId);
    }
}
