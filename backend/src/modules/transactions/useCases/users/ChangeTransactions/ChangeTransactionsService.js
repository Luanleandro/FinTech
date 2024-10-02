import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';
import { BusinessError } from '@shared/errors/BusinessError';
import { NotFoundError } from '@shared/errors/NotFoundError';

class ChangeTransactionsService {
  constructor(transactionsRepository = new TransactionsRepository()) {
    this.transactiosRepository = transactionsRepository;
  }

  async execute(params) {
    const transaction = await this.transactiosRepository.findById(
      params.transactionId,
    );

    if (!transaction) {
      throw new NotFoundError('A transação não existe!!');
    }

    if (params.userId !== transaction.user_id) {
      throw new BusinessError(
        'Você não tem permissão para realizar essa operação!!',
      );
    }

    const updateTransactionData = {
      id: params.transactionId,
      value: params.value,
      type: params.type,
      description: params.description,
      updated_at: new Date(),
    };

    const transactionUpdated = await this.transactiosRepository.update(
      updateTransactionData,
    );

    return transactionUpdated;
  }
}

export { ChangeTransactionsService };
