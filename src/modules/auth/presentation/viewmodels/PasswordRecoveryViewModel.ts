import { makeAutoObservable } from 'mobx';
import { PasswordRecoveryUseCase } from '../../domain/usecases/PasswordRecoveryUseCase';

export class PasswordRecoveryViewModel {
  email = '';
  loading = false;
  error: string | null = null;
  success = false;

  constructor(private readonly recoveryUseCase: PasswordRecoveryUseCase) {
    makeAutoObservable(this);
  }

  setEmail(email: string) {
    this.email = email;
  }

  async recover() {
    this.loading = true;
    this.error = null;
    this.success = false;
    try {
      await this.recoveryUseCase.execute(this.email);
      this.success = true;
    } catch (e: any) {
      this.error = e.message || 'Unknown error';
    }
    this.loading = false;
  }
}
