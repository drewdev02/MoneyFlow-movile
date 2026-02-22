import { HttpClient } from '@/core/http';
import { LoggerFactory } from '@/core/logger';
import { ApiRoutes } from '@/shared/constants/api-routes';
import { User } from '../../domain/models/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { AuthResponseDto } from '../dto/AuthResponseDto';
import { ITokenService } from '@/core/auth/TokenService';
import { AuthError, NetworkError, UnknownError } from '@/shared/errors/AppError';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly logger = LoggerFactory.createLogger(AuthRepositoryImpl.name)
  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: ITokenService
  ) { }

  async login(email: string, password: string): Promise<User> {
    this.logger.info(`Logging in user with email: ${email}`);
    try {
      const response = await this.httpClient.post<AuthResponseDto>(ApiRoutes.Login, { email, password });
      
      const { token } = response.data;
      await this.tokenService.setToken(token);
      
      // Since backend doesn't return user info in login, we might need to fetch it or decode it.
      // For now, return a partial user or fetch it if there's an endpoint.
      // Assuming for now we just need the token and the email.
      return { id: 'some-id', email, name: email.split('@')[0] };
    } catch (error: any) {
      this.logger.error(`Login failed for email: ${email}`, error);
      
      if (error.response) {
        const message = error.response.data?.message || error.response.data || 'Invalid credentials';
        throw new AuthError(message, 'INVALID_CREDENTIALS');
      } else if (error.request) {
        throw new NetworkError();
      } else {
        throw new UnknownError(error.message);
      }
    }
  }

  async loginWithGoogle(): Promise<User> {
    return Promise.resolve({ id: 'google-user', name: 'Google User', email: 'googleuser@example.com' });
  }

  async logout(): Promise<void> {
    this.logger.info('Logging out user');
    await this.tokenService.removeToken();
  }

  async getCurrentUser(): Promise<User | null> {
    this.logger.info('Getting current user');
    const token = await this.tokenService.getToken();
    if (!token) return null;
    
    // Logic to fetch user profile with token would go here
    return null;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    this.logger.info(`Signing up user with email: ${email}`);
    try {
      const response = await this.httpClient.post<User>(ApiRoutes.SignUp, { username: name, email, password });
      return response.data;
    } catch (error: any) {
      this.logger.error(`SignUp failed for email: ${email}`, error);
      if (error.response) {
        throw new AuthError(error.response.data?.message || 'SignUp failed');
      }
      throw new NetworkError();
    }
  }

  async recoverPassword(email: string): Promise<void> {
    this.logger.info(`Recovering password for email: ${email}`);
    try {
      await this.httpClient.post(ApiRoutes.PasswordRecovery, { email });
    } catch (error: any) {
      this.logger.error(`Password recovery failed for email: ${email}`, error);
      throw new AuthError('Failed to send recovery email');
    }
  }
}
