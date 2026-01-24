import { ContainerModule } from "inversify";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";
import { TransactionRepositoryImpl } from "../data/repositories/TransactionRepositoryImpl";
import { GetTransactionByIdUseCase } from "../domain/usecases/GetTransactionByIdUseCase";
import { TransactionDetailViewModel } from "../presentation/viewmodels/TransactionDetailViewModel";

export const transactionsModule = new ContainerModule((options) => {
  options.bind<TransactionRepository>(TransactionRepository).to(TransactionRepositoryImpl);
  options.bind<GetTransactionByIdUseCase>(GetTransactionByIdUseCase).toDynamicValue((context) =>
    new GetTransactionByIdUseCase(context.get(TransactionRepository))
  );
  options.bind<TransactionDetailViewModel>(TransactionDetailViewModel).toDynamicValue((context) =>
    new TransactionDetailViewModel(context.get(GetTransactionByIdUseCase))
  );
});
