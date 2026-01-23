import { AccountDetail } from "../models/AccountDetail";

import { Account } from "../models/Account";

export abstract class AccountRepository {
    abstract getAccountDetail(accountId: string): Promise<AccountDetail>;
    abstract addAccount(account: Account): Promise<void>;
}