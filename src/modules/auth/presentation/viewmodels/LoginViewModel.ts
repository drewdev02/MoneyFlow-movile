import { makeAutoObservable } from 'mobx';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';
import { LoginWithGoogleUseCase } from '../../domain/usecases/LoginWithGoogleUseCase';

export class LoginViewModel {
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
      this.error = 'Please fill in all fields';
      return false;
    }

    this.loading = true;
    this.error = '';
    try {
      await this.loginUseCase.execute(this.email, this.password);
      return true;
    } catch (error: any) {
      this.error = error.message || 'Login failed';
      return true;
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
