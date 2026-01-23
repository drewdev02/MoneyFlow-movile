import { Account } from '../../models/Account';
import { AccountRepository } from '../../repositories/AccountRepository';
import { AddAccountUseCase } from '../AddAccountUseCase';

describe('AddAccountUseCase', () => {
  let useCase: AddAccountUseCase;
  let repository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    repository = {
      addAccount: jest.fn()
    } as any;
    useCase = new AddAccountUseCase(repository);
  });

  it('should call addAccount with the account', async () => {
    const account: Account = {
      id: '1',
      name: 'Test',
      balance: 100,
      currency: 'USD',
      color: '#fff',
      icon: 'wallet',
      type: 'cash',
      percentage: 100
    };
    repository.addAccount.mockResolvedValue(undefined);
    await expect(useCase.execute(account)).resolves.toBeUndefined();
    expect(repository.addAccount).toHaveBeenCalledWith(account);
  });
});
