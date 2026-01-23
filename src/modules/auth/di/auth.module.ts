import { ContainerModule } from "inversify";
import { AuthApi } from "../data/api/AuthApi";
import { AuthRepositoryImpl } from "../data/repositories/AuthRepositoryImpl";
import { AuthRepository } from "../domain/repositories/AuthRepository";
import { LoginUseCase } from "../domain/usecases/LoginUseCase";
import { LoginViewModel } from "../presentation/viewmodels/LoginViewModel";

export const authModule = new ContainerModule(options => {
    options.bind<AuthApi>(AuthApi).toSelf();
    options.bind<AuthRepository>(AuthRepository).toDynamicValue(context =>
        new AuthRepositoryImpl(context.get(AuthApi))
    );
    options.bind<LoginUseCase>(LoginUseCase).toDynamicValue(context =>
        new LoginUseCase(context.get(AuthRepository))
    );
    options.bind<LoginViewModel>(LoginViewModel).toDynamicValue(context =>
        new LoginViewModel(context.get(LoginUseCase))
    );
});
