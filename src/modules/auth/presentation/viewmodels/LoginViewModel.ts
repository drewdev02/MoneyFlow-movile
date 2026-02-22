import { LoggerFactory } from '@/core/logger';
import { makeAutoObservable } from 'mobx';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';
import { LoginWithGoogleUseCase } from '../../domain/usecases/LoginWithGoogleUseCase';

export class LoginViewModel {
  private readonly logger = LoggerFactory.createLogger(LoginViewModel.name);
  email = '';
  password = '';
  loading = false;
  error = '';
  isPasswordVisible = false;

  constructor(
    private loginUseCase: LoginUseCase,
    private loginWithGoogleUseCase: LoginWithGoogleUseCase
  ) {
    makeAutoObservable(this);
  }

  setEmail(email: string) {
    this.email = email;
    this.error = '';
  }

  setPassword(password: string) {
    this.password = password;
    this.error = '';
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async login() {
    if (!this.email || !this.password) {
      this.error = 'Por favor, completa todos los campos';
      return false;
    }

    this.loading = true;
    this.error = '';
    try {
      await this.loginUseCase.execute(this.email, this.password);
      return true;
    } catch (error: any) {
      this.logger.error('Login error', error);
      this.error = error.message || 'Error al iniciar sesión';
      return false;
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    this.loading = true;
    this.error = '';
    try {
      await this.loginWithGoogleUseCase.execute();
      return true;
    } catch (error: any) {
      this.error = error.message || 'Google login failed';
      return false;
    } finally {
      this.loading = false;
    }
  }
}
