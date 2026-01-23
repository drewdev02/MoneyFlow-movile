import { AccountDetail } from "../../domain/models/AccountDetail";
import { AccountRepository } from "../../domain/repositories/AccountRepository";



export class AccountRepositoryImpl extends AccountRepository {
    async getAccountDetail(accountId: string): Promise<AccountDetail> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data matching the image
        return {
            id: accountId,
            name: "Cash",
            balance: 2485.00,
            currency: "USD",
            color: "#4CAF50", // Greenish for cash
            icon: "cash-outline",
            type: "cash",
            percentage: 0.5,
            transactions: [
                {
                    id: "1",
                    description: "Transport",
                    amount: -10.00,
                    date: "2026-01-21T10:00:00Z",
                    currency: "USD",
                    type: "expense",
                    categoryIcon: "car-sport",
                    categoryColor: "#4285F4" // Blue
                },
                {
                    id: "2",
                    description: "Galletas",
                    amount: -5.00,
                    date: "2026-01-20T15:30:00Z",
                    currency: "USD",
                    type: "expense",
                    categoryIcon: "nutrition", // Apple replacement
                    categoryColor: "#EA4335" // Red
                },
                {
                    id: "3",
                    description: "Salary",
                    amount: 2000.00,
                    date: "2026-01-01T09:00:00Z",
                    currency: "USD",
                    type: "income",
                    categoryIcon: "cash",
                    categoryColor: "#34A853" // Green
                }
            ]
        };
    }
}
