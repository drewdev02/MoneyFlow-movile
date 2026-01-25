import { PasswordRecoveryUseCase } from '../PasswordRecoveryUseCase';

describe('PasswordRecoveryUseCase', () => {
  let useCase: PasswordRecoveryUseCase;
  beforeEach(() => {
    useCase = new PasswordRecoveryUseCase();
  });

  it('should resolve if email is valid', async () => {
    await expect(useCase.execute('test@mail.com')).resolves.toBeUndefined();
  });

  it('should throw if email is missing', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Email is required');
  });

  it('should throw if email is invalid', async () => {
    await expect(useCase.execute('invalidemail')).rejects.toThrow('Invalid email');
  });
});
