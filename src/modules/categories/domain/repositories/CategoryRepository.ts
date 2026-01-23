import { Category } from '../models/Category';

export abstract class CategoryRepository {
  abstract getCategories(): Promise<Category[]>;
}
