import { Container } from 'inversify';
import { AuthApi } from '../data/api/AuthApi';
import { AuthRepositoryImpl } from '../data/repositories/AuthRepositoryImpl';
import { AuthRepository } from '../domain/repositories/AuthRepository';
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { LoginViewModel } from '../presentation/viewmodels/LoginViewModel';

export const bindAuthModule = (container: Container) => {
  container.bind<AuthApi>(AuthApi).toSelf().inSingletonScope();
  container.bind<AuthRepository>(AuthRepository).toDynamicValue(() => new AuthRepositoryImpl(container.get(AuthApi))).inSingletonScope();
  container.bind<LoginUseCase>(LoginUseCase).toDynamicValue(() => new LoginUseCase(container.get(AuthRepository))).inSingletonScope();
  container.bind<LoginViewModel>(LoginViewModel).toDynamicValue(() => new LoginViewModel(container.get(LoginUseCase))).inSingletonScope();
};
