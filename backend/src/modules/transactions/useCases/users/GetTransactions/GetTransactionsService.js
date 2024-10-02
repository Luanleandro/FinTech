import { TransactionsRepository } from '@modules/transactions/infra/repositories/TransactionsRepository';
class GetTransactionsService {
  constructor(transactionsRepository = new TransactionsRepository()) {
    this.transactionsRepository = transactionsRepository;
  }

  async execute(params) {
    const transactions = await this.transactionsRepository.findAll(params);

    return transactions;
  }
}

export { GetTransactionsService };
