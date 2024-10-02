import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';

import { CreateTransactionsController } from './CreateTransactionsController';
import { CreateTransactionsService } from './CreateTransactionsService';

const createTransactionsFactory = () => {
  const createTransactionService = new CreateTransactionsService(
    new TransactionsRepository(),
  );

  const createTransactionsController = new CreateTransactionsController(
    createTransactionService,
  );

  return createTransactionsController;
};

export { createTransactionsFactory };
