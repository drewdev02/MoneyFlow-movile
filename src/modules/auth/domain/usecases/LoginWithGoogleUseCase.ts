import { User } from '../models/User';
import { AuthRepository } from '../repositories/AuthRepository';

export class LoginWithGoogleUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<User> {
    return this.authRepository.loginWithGoogle();
  }
}
