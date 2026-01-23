import { User } from '../../domain/models/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { AuthApi } from '../api/AuthApi';

export class AuthRepositoryImpl extends AuthRepository {
  constructor(private api: AuthApi) {
    super();
  }

  async login(email: string, password: string): Promise<User> {
    return this.api.login(email, password);
  }

  async loginWithGoogle(): Promise<User> {
    return this.api.loginWithGoogle();
  }
}
