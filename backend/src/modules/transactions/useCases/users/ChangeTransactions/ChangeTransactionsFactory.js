import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';

import { ChangeTransactionsController } from './ChangeTransactionsController';
import { ChangeTransactionsService } from './ChangeTransactionsService';

const changeTransationFactory = () => {
  const changeTransactionService = new ChangeTransactionsService(
    new TransactionsRepository(),
  );

  const changeTransactionController = new ChangeTransactionsController(
    changeTransactionService,
  );

  return changeTransactionController;
};

export { changeTransationFactory };
