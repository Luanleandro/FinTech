import knex from '@shared/infra/knex';
import { ROLE_TYPES } from '@utils/helper/utils';

const REPOSITORY = 'credit_requests';

class RequestsCreditRepository {
  async findAll(roleId, userId) {
    const requests = await knex(REPOSITORY).modify(queryModify => {
      if (roleId === ROLE_TYPES.MEMBER) {
        queryModify.andWhere('user_id', userId);
      }
    });
    return requests;
  }

  async create(userData) {
    const requests = await knex(REPOSITORY)
      .insert(userData)
      .where('user_id', userData.userId)
      .returning('*');
    return requests[0];
  }

  async findById(id) {
    const request = await knex(REPOSITORY).select('*').where('id', id);
    return request[0];
  }

  async changeStatusAcceptById({ creditRequest, transactionRequest }) {
    const { requestId, ...dataToUpdate } = creditRequest;
    const { user_id, value } = transactionRequest;

    const trx = await knex.transaction();

    try {
      const request = await trx(REPOSITORY)
        .where('id', requestId)
        .update(dataToUpdate)
        .returning('*');

      await trx('transactions').insert(transactionRequest);

      await trx('user_wallet')
        .where('user_id', user_id)
        .increment('balance', value);

      await trx.commit();

      return request[0];
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async changeStatusRejectById(id, status) {
    const request = await knex(REPOSITORY)
      .where('id', id)
      .update({ status: status })
      .returning('*');
    return request[0];
  }

  async findLastByUserId(userId) {
    const request = await knex(REPOSITORY)
      .select('*')
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .limit(1);
    return request[0];
  }
}

export { RequestsCreditRepository };
