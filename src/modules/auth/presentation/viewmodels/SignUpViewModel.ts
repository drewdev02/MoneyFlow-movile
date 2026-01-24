import { makeAutoObservable } from 'mobx';
import { SignUpUseCase } from '../../domain/usecases/SignUpUseCase';

export class SignUpViewModel {
  name = '';
  email = '';
  password = '';
  repeatPassword = '';
  loading = false;
  error: string | null = null;
  success = false;

  constructor(private readonly signUpUseCase: SignUpUseCase) {
    makeAutoObservable(this);
  }

  setName(name: string) {
    this.name = name;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setRepeatPassword(repeatPassword: string) {
    this.repeatPassword = repeatPassword;
  }

  async signUp() {
    this.loading = true;
    this.error = null;
    try {
      await this.signUpUseCase.execute({
        name: this.name,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword,
      });
      this.success = true;
    } catch (e: any) {
      this.error = e.message || 'Unknown error';
    } finally {
      this.loading = false;
    }
  }
}
