import { Account } from "../../domain/models/Account";
import { BalanceRepository } from "../../domain/repositories/BalanceRepository";

export class BalanceRepositoryImpl extends BalanceRepository {
    async getAccounts(): Promise<Account[]> {
        // Mock data to match the image
        return [
            {
                id: '1',
                name: 'Cash',
                balance: 2485.00,
                currency: 'USD',
                color: '#2e7d32', // Darker green
                icon: 'cash',
                type: 'cash'
            },
            {
                id: '2',
                name: 'Tropipay',
                balance: 1950.00,
                currency: 'USD',
                color: '#9c27b0', // Purple
                icon: 'card', 
                type: 'card'
            }
        ];
    }
}
