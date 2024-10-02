import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';

class CreateTransactionsService {
  constructor(transactionsRepository = new TransactionsRepository()) {
    this.transactionsRepository = transactionsRepository;
  }

  async execute(params) {
    const createTransaction = {
      user_id: params.userId,
      value: params.value,
      type: params.type,
      description: params.description,
    };

    const transaction =
      await this.transactionsRepository.create(createTransaction);

    return transaction;
  }
}

export { CreateTransactionsService };
