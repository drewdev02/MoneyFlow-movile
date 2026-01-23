import { User } from '../../models/User';
import { AuthRepository } from '../../repositories/AuthRepository';
import { LoginUseCase } from '../LoginUseCase';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepository = {
      login: jest.fn()
    } as any;
    loginUseCase = new LoginUseCase(authRepository);
  });

  it('should throw if email or password is missing', async () => {
    await expect(loginUseCase.execute('', '123')).rejects.toThrow();
    await expect(loginUseCase.execute('test@mail.com', '')).rejects.toThrow();
  });

  it('should call repository.login with correct params', async () => {
    const user: User = { id: '1', email: 'test@mail.com', name: 'Test' } as User;
    authRepository.login.mockResolvedValue(user);
    const result = await loginUseCase.execute('test@mail.com', '123');
    expect(authRepository.login).toHaveBeenCalledWith('test@mail.com', '123');
    expect(result).toBe(user);
  });
});
