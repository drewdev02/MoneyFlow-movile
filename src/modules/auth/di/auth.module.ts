import { ContainerModule } from "inversify";
import { AuthRepository } from "../domain/repositories/AuthRepository";
import { GetCurrentUserUseCase } from "../domain/usecases/GetCurrentUserUseCase";
import { LoginUseCase } from "../domain/usecases/LoginUseCase";
import { LoginWithGoogleUseCase } from "../domain/usecases/LoginWithGoogleUseCase";
import { LogoutUseCase } from "../domain/usecases/LogoutUseCase";
import { PasswordRecoveryUseCase } from "../domain/usecases/PasswordRecoveryUseCase";
import { SignUpUseCase } from "../domain/usecases/SignUpUseCase";
import { LoginViewModel } from "../presentation/viewmodels/LoginViewModel";
import { PasswordRecoveryViewModel } from "../presentation/viewmodels/PasswordRecoveryViewModel";
import { SignUpViewModel } from "../presentation/viewmodels/SignUpViewModel";

import { AuthRepositoryImpl } from "../data/repositories/AuthRepositoryImpl";
import { HttpClient } from "@/core/http";
import { TokenService } from "@/core/auth/TokenService";

export const authModule = new ContainerModule(options => {
    options.bind<AuthRepository>(AuthRepository).toDynamicValue(context =>
        new AuthRepositoryImpl(
            context.get(HttpClient),
            context.get(TokenService)
        )
    );
    options.bind<LoginUseCase>(LoginUseCase).toDynamicValue(context =>
        new LoginUseCase(context.get(AuthRepository))
    );
    options.bind<LoginWithGoogleUseCase>(LoginWithGoogleUseCase).toDynamicValue(context =>
        new LoginWithGoogleUseCase(context.get(AuthRepository))
    );
    options.bind<LogoutUseCase>(LogoutUseCase).toDynamicValue(context =>
        new LogoutUseCase(context.get(AuthRepository))
    );
    options.bind<GetCurrentUserUseCase>(GetCurrentUserUseCase).toDynamicValue(context =>
        new GetCurrentUserUseCase(context.get(AuthRepository))
    );
    options.bind<LoginViewModel>(LoginViewModel).toDynamicValue(context =>
        new LoginViewModel(
            context.get(LoginUseCase),
            context.get(LoginWithGoogleUseCase)
        )
    );
    options.bind<SignUpUseCase>(SignUpUseCase).toDynamicValue(context =>
        new SignUpUseCase(context.get(AuthRepository))
    );
    options.bind<SignUpViewModel>(SignUpViewModel).toDynamicValue(context =>
        new SignUpViewModel(context.get(SignUpUseCase))
    );
    options.bind<PasswordRecoveryUseCase>(PasswordRecoveryUseCase).toDynamicValue(context =>
        new PasswordRecoveryUseCase(context.get(AuthRepository))
    );
    options.bind<PasswordRecoveryViewModel>(PasswordRecoveryViewModel).toDynamicValue(context =>
        new PasswordRecoveryViewModel(context.get(PasswordRecoveryUseCase))
    );
});
