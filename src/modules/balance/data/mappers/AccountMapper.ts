// Example mapper (expand as needed)
import { Account } from '../../domain/models/Account';

export class AccountMapper {
  static toDTO(account: Account) {
    // Map domain to DTO for API or storage
    return { ...account };
  }
  static fromDTO(dto: any): Account {
    // Map DTO to domain
    return { ...dto };
  }
}
