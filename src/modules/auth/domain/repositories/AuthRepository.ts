import { User } from '../models/User';

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<User>;
  abstract loginWithGoogle(): Promise<User>;
}
