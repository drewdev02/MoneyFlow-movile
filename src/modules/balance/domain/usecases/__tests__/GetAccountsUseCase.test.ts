import { Account } from '../../models/Account';
import { BalanceRepository } from '../../repositories/BalanceRepository';
import { GetAccountsUseCase } from '../GetAccountsUseCase';

describe('GetAccountsUseCase', () => {
  let useCase: GetAccountsUseCase;
  let repository: jest.Mocked<BalanceRepository>;

  beforeEach(() => {
    repository = {
      getAccounts: jest.fn()
    } as any;
    useCase = new GetAccountsUseCase(repository);
  });

  it('should calculate percentages and return accounts', async () => {
    const accounts: Account[] = [
      { id: '1', name: 'A', balance: 100 } as Account,
      { id: '2', name: 'B', balance: 100 } as Account
    ];
    repository.getAccounts.mockResolvedValue(accounts);
    const result = await useCase.execute();
    expect(result[0].percentage).toBe(50);
    expect(result[1].percentage).toBe(50);
  });
});
