import { SignUpViewModel } from '../SignUpViewModel';

describe('SignUpViewModel', () => {
  let vm: SignUpViewModel;
  let mockSignUpUseCase: { execute: jest.Mock };

  beforeEach(() => {
    mockSignUpUseCase = { execute: jest.fn().mockResolvedValue(undefined) };
    vm = new SignUpViewModel(mockSignUpUseCase as any);
    vm.setName('Test User');
    vm.setEmail('test@mail.com');
    vm.setPassword('123456');
    vm.setRepeatPassword('123456');
  });

  it('should set success=true when registration is successful', async () => {
    await vm.signUp();
    expect(vm.success).toBe(true);
    expect(vm.error).toBeNull();
    expect(vm.loading).toBe(false);
  });

  it('should set error if registration fails (passwords do not match)', async () => {
    mockSignUpUseCase.execute.mockRejectedValueOnce(new Error('Passwords do not match'));
    vm.setRepeatPassword('ABCDEF');
    await vm.signUp();
    expect(vm.success).toBe(false);
    expect(vm.error).toBe('Passwords do not match');
    expect(vm.loading).toBe(false);
  });
});
