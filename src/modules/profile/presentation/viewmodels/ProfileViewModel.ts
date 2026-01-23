import { LoggerFactory } from '@/core/logger';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

@injectable()
export class ProfileViewModel {
  username = 'Secret Guest';
  isPremium = false;
  private logger = LoggerFactory.createLogger(ProfileViewModel.name);

  constructor() {
    makeAutoObservable(this);
  }

  setPremium(value: boolean) {
    this.isPremium = value;
  }

  logout() {
    this.logger.debug('Logging out...');
    // Implement logout logic here
  }
}
