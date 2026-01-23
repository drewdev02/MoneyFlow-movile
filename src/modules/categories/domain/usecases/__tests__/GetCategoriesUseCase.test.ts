import { Category } from '../../models/Category';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { GetCategoriesUseCase } from '../GetCategoriesUseCase';

describe('GetCategoriesUseCase', () => {
  let useCase: GetCategoriesUseCase;
  let repository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    repository = {
      getCategories: jest.fn()
    } as any;
    useCase = new GetCategoriesUseCase(repository);
  });

  it('should return categories from repository', async () => {
    const categories: Category[] = [
      { id: '1', name: 'Food' } as Category
    ];
    repository.getCategories.mockResolvedValue(categories);
    const result = await useCase.execute();
    expect(result).toBe(categories);
  });
});
