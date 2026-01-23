import { injectable } from 'inversify';
import { Category } from '../models/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

@injectable()
export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }
}
