import { injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';
import { Category } from '../../domain/models/Category';
import { GetCategoriesUseCase } from '../../domain/usecases/GetCategoriesUseCase';

@injectable()
export class CategoryViewModel {
  categories: Category[] = [];
  loading = false;

  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {
    makeAutoObservable(this);
  }

  async loadCategories() {
    this.loading = true;
    try {
      const result = await this.getCategoriesUseCase.execute();
      runInAction(() => {
        this.categories = result;
      });
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
