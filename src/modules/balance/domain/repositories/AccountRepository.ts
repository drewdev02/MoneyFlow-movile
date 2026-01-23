import { AccountDetail } from "../models/AccountDetail";

export abstract class AccountRepository {
    abstract getAccountDetail(accountId: string): Promise<AccountDetail>

}