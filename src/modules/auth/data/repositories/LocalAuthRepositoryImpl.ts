import { Database } from '@/core/db';
import * as schema from '@/core/db/schema';
import { LoggerFactory } from '@/core/logger';
import { generateUUID } from '@/shared/utils/uuid';
import { eq } from 'drizzle-orm';
import { User } from '../../domain/models/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class LocalAuthRepositoryImpl implements AuthRepository {
  private readonly logger = LoggerFactory.createLogger(LocalAuthRepositoryImpl.name);

  constructor(
    private readonly db: Database
  ) { }

  async login(email: string, password: string): Promise<User> {
    this.logger.info(`Attempting local login for email: ${email}`);
    
    try {
      // En una implementación real local, podríamos verificar un hash de password
      // Por ahora, buscaremos el usuario en la tabla 'users'
      const results = await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .limit(1);

      if (results.length === 0) {
        this.logger.warn(`User not found locally: ${email}`);
        throw new Error('Invalid credentials or user not found locally');
      }

      const [user] = results;
      return {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
        photoUrl: user.photoUrl ?? undefined,
      };
    } catch (error) {
      this.logger.error(`Local login failed for email: ${email}`, error);
      throw error instanceof Error ? error : new Error('Local login failed');
    }
  }

  async loginWithGoogle(): Promise<User> {
    this.logger.info('Local loginWithGoogle called (simulated)');
    // Simulación de usuario logueado con Google localmente
    return {
      id: 'local-google-id',
      email: 'local-google@example.com',
      name: 'Local Google User'
    };
  }

  async logout(): Promise<void> {
    this.logger.info('Local logout called');
    // En una implementación real, borraríamos el estado de sesión local
    return Promise.resolve();
  }

  async getCurrentUser(): Promise<User | null> {
    this.logger.info('Local getCurrentUser called');
    // En una implementación real, buscaríamos la sesión activa localmente
    return Promise.resolve(null);
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    this.logger.info(`Local signUp called for email: ${email}`);
    try {
      const newUser = {
        id: generateUUID(),
        email,
        name,
      };
      
      await this.db.insert(schema.users).values({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      });

      return newUser;
    } catch (error) {
      this.logger.error(`Local signUp failed for email: ${email}`, error);
      throw error instanceof Error ? error : new Error('Local signUp failed');
    }
  }

  async recoverPassword(email: string): Promise<void> {
    this.logger.info(`Local recoverPassword called for email: ${email}`);
    await new Promise(res => setTimeout(res, 500));
    return Promise.resolve();
  }
}
