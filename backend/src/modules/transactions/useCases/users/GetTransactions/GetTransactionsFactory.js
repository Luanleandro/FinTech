import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';

import { GetTransactionsController } from './GetTransactionsController';
import { GetTransactionsService } from './GetTransactionsService';

const getTransactionsFactory = () => {
  const getTransactionsService = new GetTransactionsService(
    new TransactionsRepository(),
  );

  const getTransactionsController = new GetTransactionsController(
    getTransactionsService,
  );

  return getTransactionsController;
};

export { getTransactionsFactory };
