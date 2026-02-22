import { User } from '../models/User';
import { AuthRepository } from '../repositories/AuthRepository';

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export class SignUpUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: SignUpParams): Promise<User> {
    if (!params.name || !params.email || !params.password || !params.repeatPassword) {
      throw new Error('All fields are required');
    }
    if (params.password !== params.repeatPassword) {
      throw new Error('Passwords do not match');
    }
    if (!params.email.includes('@')) {
      throw new Error('Invalid email');
    }

    return this.authRepository.signUp(params.name, params.email, params.password);
  }
}
