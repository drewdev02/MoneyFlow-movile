import { ContainerModule } from "inversify";
import { CategoryRepositoryImpl } from "../data/repositories/CategoryRepositoryImpl";
import { CategoryRepository } from "../domain/repositories/CategoryRepository";
import { GetCategoriesUseCase } from "../domain/usecases/GetCategoriesUseCase";
import { CategoryViewModel } from "../presentation/viewmodels/CategoryViewModel";

export const categoriesModule = new ContainerModule((options) => {
    options.bind<CategoryRepository>(CategoryRepository).to(CategoryRepositoryImpl);
    options.bind<GetCategoriesUseCase>(GetCategoriesUseCase).toDynamicValue((context) =>
        new GetCategoriesUseCase(context.get(CategoryRepository))
    );
    options.bind<CategoryViewModel>(CategoryViewModel).toDynamicValue((context) =>
        new CategoryViewModel(context.get(GetCategoriesUseCase))
    );
});
