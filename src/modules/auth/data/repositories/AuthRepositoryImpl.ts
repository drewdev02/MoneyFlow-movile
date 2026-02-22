import { HttpClient } from '@/core/http';
import { LoggerFactory } from '@/core/logger';
import { ApiRoutes } from '@/shared/constants/api-routes';
import { User } from '../../domain/models/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly logger = LoggerFactory.createLogger(AuthRepositoryImpl.name)
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  async login(email: string, password: string): Promise<User> {
    this.logger.info(`Logging in user with email: ${email} and password: ${password}`);
    try {
      const response = await this.httpClient.post<User>(ApiRoutes.Login, { email, password });
      return response.data;
    } catch (error) {
      this.logger.error(`Login failed for email: ${email}`, error);
      throw new Error('Login failed');//Hacer un manejo de errores más específico con errores de dominio
    }
  }

  async loginWithGoogle(): Promise<User> {
    return Promise.resolve({ id: 'google-user', name: 'Google User', email: 'googleuser@example.com' });
  }

  async logout(): Promise<void> {
    this.logger.info('Logging out user');
    // Implement logic to clear session/token
    return Promise.resolve();
  }

  async getCurrentUser(): Promise<User | null> {
    this.logger.info('Getting current user');
    // Implement logic to retrieve session/token and get user info
    return Promise.resolve(null);
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    this.logger.info(`Signing up user with email: ${email}`);
    try {
      const response = await this.httpClient.post<User>(ApiRoutes.Login, { name, email, password }); // Assuming same endpoint or similar
      return response.data;
    } catch (error) {
      this.logger.error(`SignUp failed for email: ${email}`, error);
      throw new Error('SignUp failed');
    }
  }

  async recoverPassword(email: string): Promise<void> {
    this.logger.info(`Recovering password for email: ${email}`);
    try {
      await this.httpClient.post(ApiRoutes.Login, { email }); // Placeholder endpoint
    } catch (error) {
      this.logger.error(`Password recovery failed for email: ${email}`, error);
      throw new Error('Password recovery failed');
    }
  }
}
