export class PasswordRecoveryUseCase {
  async execute(email: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 800));
    if (!email) throw new Error('Email is required');
    if (!email.includes('@')) throw new Error('Invalid email');
    // mock: success
    return;
  }
}
