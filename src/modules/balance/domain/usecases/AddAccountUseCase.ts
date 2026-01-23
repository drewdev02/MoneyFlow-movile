import { Account } from '../models/Account';
import { AccountRepository } from '../repositories/AccountRepository';

export class AddAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(account: Account) {
    return this.accountRepository.addAccount(account);
  }
}
