import { AccountDetail } from '../../models/AccountDetail';
import { AccountRepository } from '../../repositories/AccountRepository';
import { GetAccountDetailUseCase } from '../GetAccountDetailUseCase';

describe('GetAccountDetailUseCase', () => {
  let useCase: GetAccountDetailUseCase;
  let repository: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    repository = {
      getAccountDetail: jest.fn()
    } as any;
    useCase = new GetAccountDetailUseCase(repository);
  });

  it('should call getAccountDetail with the accountId', async () => {
    const detail = { id: '1', name: 'Test', balance: 100 } as AccountDetail;
    repository.getAccountDetail.mockResolvedValue(detail);
    const result = await useCase.execute('1');
    expect(repository.getAccountDetail).toHaveBeenCalledWith('1');
    expect(result).toBe(detail);
  });
});
