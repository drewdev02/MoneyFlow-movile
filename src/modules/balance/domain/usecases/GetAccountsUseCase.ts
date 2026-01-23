import { Account } from "../models/Account";
import { BalanceRepository } from "../repositories/BalanceRepository";

export class GetAccountsUseCase {
    constructor(private repository: BalanceRepository) {}

    async execute(): Promise<Account[]> {
        const accounts = await this.repository.getAccounts();
        
        // Calculate percentages
        const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);
        
        return accounts.map(acc => ({
            ...acc,
            percentage: total > 0 ? (acc.balance / total) * 100 : 0
        }));
    }
}
