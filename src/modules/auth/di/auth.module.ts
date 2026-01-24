import { ContainerModule } from "inversify";
import { AuthApi } from "../data/api/AuthApi";
import { AuthRepositoryImpl } from "../data/repositories/AuthRepositoryImpl";
import { AuthRepository } from "../domain/repositories/AuthRepository";
import { LoginUseCase } from "../domain/usecases/LoginUseCase";
import { PasswordRecoveryUseCase } from "../domain/usecases/PasswordRecoveryUseCase";
import { SignUpUseCase } from "../domain/usecases/SignUpUseCase";
import { LoginViewModel } from "../presentation/viewmodels/LoginViewModel";
import { PasswordRecoveryViewModel } from "../presentation/viewmodels/PasswordRecoveryViewModel";
import { SignUpViewModel } from "../presentation/viewmodels/SignUpViewModel";

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
    options.bind<SignUpUseCase>(SignUpUseCase).toSelf();
    options.bind<SignUpViewModel>(SignUpViewModel).toDynamicValue(context =>
        new SignUpViewModel(context.get(SignUpUseCase))
    );
    options.bind<PasswordRecoveryUseCase>(PasswordRecoveryUseCase).toSelf();
    options.bind<PasswordRecoveryViewModel>(PasswordRecoveryViewModel).toDynamicValue(context =>
        new PasswordRecoveryViewModel(context.get(PasswordRecoveryUseCase))
    );
});
