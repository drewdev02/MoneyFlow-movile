import { HttpClient } from '@/core/http';
import { User } from '../../domain/models/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { LoggerFactory } from '@/core/logger';
import { ApiRoutes } from '@/shared/constants/api-routes';

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
}
