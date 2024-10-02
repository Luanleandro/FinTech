import knex from '@shared/infra/knex/index';
const REPOSITORY = 'user_wallet';

class UserWalletRepository {
  async findByUserId(userId) {
    const userWallet = await knex(REPOSITORY)
      .select('*')
      .where('user_id', userId);
    return userWallet;
  }

  async create(data) {
    const userWallet = await knex(REPOSITORY).insert(data).returning('*');
    return userWallet[0];
  }
}

export { UserWalletRepository };
