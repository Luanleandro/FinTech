import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';

import { DeleteTransactionsController } from './DeleteTransactionsController';
import { DeleteTransactionsService } from './DeleteTransactionsService';

const deleteTransactionsFactory = () => {
  const deleteTransactionService = new DeleteTransactionsService(
    new TransactionsRepository(),
  );

  const deleteTransactionController = new DeleteTransactionsController(
    deleteTransactionService,
  );

  return deleteTransactionController;
};

export { deleteTransactionsFactory };
