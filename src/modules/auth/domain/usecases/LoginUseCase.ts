import { User } from '../models/User';
import { AuthRepository } from '../repositories/AuthRepository';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    return this.authRepository.login(email, password);
  }
}
