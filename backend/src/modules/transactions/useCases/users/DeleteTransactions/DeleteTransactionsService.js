import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';
import { BusinessError } from '@shared/errors/BusinessError';
import { NotFoundError } from '@shared/errors/NotFoundError';

class DeleteTransactionsService {
  constructor(transactionsRepository = new TransactionsRepository()) {
    this.transactionsRepository = transactionsRepository;
  }

  async execute(params) {
    const transaction = await this.transactionsRepository.findById(
      params.transactionId,
    );

    if (!transaction) {
      throw new NotFoundError('Essa transação não existe!!');
    }

    if (params.userId !== transaction.user_id) {
      throw new BusinessError(
        'Você não tem permissão para realizar essa operação!!',
      );
    }

    const transactionDeleted = await this.transactionsRepository.deleteById(
      params.transactionId,
    );

    return transactionDeleted;
  }
}

export { DeleteTransactionsService };
