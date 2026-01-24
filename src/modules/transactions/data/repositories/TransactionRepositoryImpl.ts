import {TransactionRepository} from '../../domain/repositories/TransactionRepository';
import {Transaction} from '../../domain/models/Transaction';

const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: '1',
        category: {name: 'Food', color: '#40313C'},
        description: 'Galletas',
        amount: -5.0,
        date: '20 January 2026 00:00',
        sum: -5.0,
        balance: 2485.0,
        currency: 'USD',
        account: {name: 'Cash'},
    },
    {
        id: '2',
        category: {name: 'Transport', color: '#BBCCDD'},
        description: 'Cab',
        amount: -10.5,
        date: '21 January 2026 09:28',
        sum: -10.5,
        balance: 2474.5,
        currency: 'USD',
        account: {name: 'Debit Card'},
    }
];

export class TransactionRepositoryImpl extends TransactionRepository {
    async getById(id: string) {
        return (
            MOCK_TRANSACTIONS[0]
        );
    }
}
