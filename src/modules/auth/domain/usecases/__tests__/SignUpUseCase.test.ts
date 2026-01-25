import { SignUpUseCase } from '../SignUpUseCase';

describe('SignUpUseCase', () => {
  let signUpUseCase: SignUpUseCase;

  beforeEach(() => {
    signUpUseCase = new SignUpUseCase();
  });

  it('should register successfully with valid data', async () => {
    await expect(
      signUpUseCase.execute({
        name: 'Test User',
        email: 'test@mail.com',
        password: '123456',
        repeatPassword: '123456',
      })
    ).resolves.toBeUndefined();
  });

  it('should throw if email is missing', async () => {
    await expect(
      signUpUseCase.execute({
        name: 'Test User',
        email: '',
        password: '123456',
        repeatPassword: '123456',
      })
    ).rejects.toThrow('All fields are required');
  });

  it('should throw if passwords do not match', async () => {
    await expect(
      signUpUseCase.execute({
        name: 'Test User',
        email: 'test@mail.com',
        password: '123456',
        repeatPassword: 'ABCDEF',
      })
    ).rejects.toThrow('Passwords do not match');
  });
});
