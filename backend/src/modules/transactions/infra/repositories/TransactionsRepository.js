import knex from '@shared/infra/knex';
import { ROLE_TYPES, TRANSACTIONS_TYPE } from '@utils/helper/utils';

const REPOSITORY = 'transactions';
class TransactionsRepository {
  async findAll(params) {
    const { roleId, userId } = params;

    const transaction = await knex(REPOSITORY).modify(queryModify => {
      if (roleId == ROLE_TYPES.MEMBER) {
        queryModify.andWhere('user_id', userId);
      }
    });
    return transaction;
  }

  async create(dataTransaction) {
    const { user_id, value, type } = dataTransaction;
    const trx = await knex.transaction();

    try {
      const transaction = await trx(REPOSITORY)
        .insert(dataTransaction)
        .returning('*');

      if (type === TRANSACTIONS_TYPE.INCOME) {
        await trx('user_wallet')
          .where('user_id', user_id)
          .increment('balance', value);
      } else {
        await trx('user_wallet')
          .where('user_id', user_id)
          .decrement('balance', value);
      }

      await trx.commit();
      return transaction[0];
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async findById(transactionId) {
    const transaction = await knex(REPOSITORY)
      .select(['user_id', 'value', 'type', 'created_at'])
      .where('id', transactionId);
    return transaction[0];
  }

  async update(params) {
    const { id, ...dataToUpdate } = params;

    const transaction = await knex(REPOSITORY)
      .update(dataToUpdate)
      .where('id', id)
      .returning('*');
    return transaction[0];
  }

  async deleteById(transactionId) {
    const transaction = await knex(REPOSITORY)
      .where('id', transactionId)
      .del()
      .returning('*');
    return transaction[0];
  }
}

export { TransactionsRepository };
