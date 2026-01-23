import { Category } from '../models/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';


export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }
}
