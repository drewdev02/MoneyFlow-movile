import { ContainerModule } from "inversify";
import { AccountRepositoryImpl } from "../data/repositories/AccountRepositoryImpl";
import { BalanceRepositoryImpl } from "../data/repositories/BalanceRepositoryImpl";
import { AccountRepository } from "../domain/repositories/AccountRepository";
import { BalanceRepository } from "../domain/repositories/BalanceRepository";
import { AddAccountUseCase } from "../domain/usecases/AddAccountUseCase";
import { GetAccountDetailUseCase } from "../domain/usecases/GetAccountDetailUseCase";
import { GetAccountsUseCase } from "../domain/usecases/GetAccountsUseCase";
import { AccountDetailViewModel } from "../presentation/viewmodels/AccountDetailViewModel";
import { AddAccountViewModel } from "../presentation/viewmodels/AddAccountViewModel";
import { BalanceViewModel } from "../presentation/viewmodels/BalanceViewModel";

export const balanceModule = new ContainerModule(options => {
    options.bind<BalanceRepository>(BalanceRepository).to(BalanceRepositoryImpl);
    options.bind<GetAccountsUseCase>(GetAccountsUseCase).toDynamicValue((context) =>
        new GetAccountsUseCase(context.get(BalanceRepository))
    );
    options.bind<BalanceViewModel>(BalanceViewModel).toDynamicValue((context) =>
        new BalanceViewModel(context.get(GetAccountsUseCase))
    );
    options.bind<AccountRepository>(AccountRepository).to(AccountRepositoryImpl);
    options.bind<GetAccountDetailUseCase>(GetAccountDetailUseCase).toDynamicValue((context) =>
        new GetAccountDetailUseCase(context.get(AccountRepository))
    );
    options.bind<AccountDetailViewModel>(AccountDetailViewModel).toDynamicValue((context) =>
        new AccountDetailViewModel(context.get(GetAccountDetailUseCase))
    );
    options.bind<AddAccountUseCase>(AddAccountUseCase).toDynamicValue((context) =>
        new AddAccountUseCase(context.get(AccountRepository))
    );
    options.bind<AddAccountViewModel>(AddAccountViewModel).toDynamicValue((context) =>
        new AddAccountViewModel(context.get(AddAccountUseCase))
    );
});
