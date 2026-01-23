import { makeAutoObservable, runInAction } from 'mobx';
import { Category } from '../../domain/models/Category';
import { GetCategoriesUseCase } from '../../domain/usecases/GetCategoriesUseCase';
import { LoggerFactory } from '@/core/logger';


export class CategoryViewModel {
  categories: Category[] = [];
  loading = false;
  private logger = LoggerFactory.createLogger(CategoryViewModel.name)

  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {
    makeAutoObservable(this);
  }

  async loadCategories() {
    this.logger.debug('loadCategories');

    runInAction(() => {
      this.loading = true;
    });

    try {
      const result = await this.getCategoriesUseCase.execute();

      runInAction(() => {
        this.categories = result;
      });
    } catch (error) {
      this.logger.error('Error loading categories:', error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
