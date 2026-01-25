import { PasswordRecoveryViewModel } from '../PasswordRecoveryViewModel';

describe('PasswordRecoveryViewModel', () => {
  let vm: PasswordRecoveryViewModel;
  let mockUseCase: { execute: jest.Mock };

  beforeEach(() => {
    mockUseCase = { execute: jest.fn().mockResolvedValue(undefined) };
    vm = new PasswordRecoveryViewModel(mockUseCase as any);
    vm.setEmail('test@mail.com');
  });

  it('should set success=true when recovery succeeds', async () => {
    await vm.recover();
    expect(vm.success).toBe(true);
    expect(vm.error).toBeNull();
    expect(vm.loading).toBe(false);
  });

  it('should set error if recovery fails', async () => {
    mockUseCase.execute.mockRejectedValueOnce(new Error('Invalid email'));
    vm.setEmail('invalidemail');
    await vm.recover();
    expect(vm.success).toBe(false);
    expect(vm.error).toBe('Invalid email');
    expect(vm.loading).toBe(false);
  });

  it('should set loading=true during execution', async () => {
    let loadingInProgress = false;
    mockUseCase.execute.mockImplementation(async () => {
      loadingInProgress = vm.loading;
      return undefined;
    });
    const promise = vm.recover();
    expect(vm.loading).toBe(true);
    await promise;
    expect(loadingInProgress).toBe(true);
    expect(vm.loading).toBe(false);
  });
});
