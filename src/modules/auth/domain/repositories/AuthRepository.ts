import { User } from '../models/User';

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<User>;
  abstract loginWithGoogle(): Promise<User>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<User | null>;
  abstract signUp(name: string, email: string, password: string): Promise<User>;
  abstract recoverPassword(email: string): Promise<void>;
}
