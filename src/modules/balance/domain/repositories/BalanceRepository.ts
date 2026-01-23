import { Account } from "../models/Account";

export abstract class BalanceRepository {
    abstract getAccounts(): Promise<Account[]>;
}
