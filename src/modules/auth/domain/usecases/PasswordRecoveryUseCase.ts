import { AuthRepository } from '../repositories/AuthRepository';

export class PasswordRecoveryUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string): Promise<void> {
    if (!email) throw new Error('Email is required');
    if (!email.includes('@')) throw new Error('Invalid email');
    
    return this.authRepository.recoverPassword(email);
  }
}
