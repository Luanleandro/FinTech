import knex from '@shared/infra/knex/index';

const REPOSITORY = 'users';
const USERWALLET = 'user_wallet';

class UsersRepository {
  async getAllUsers() {
    return await knex(REPOSITORY);
  }
  async findByUid(userId) {
    const user = await knex(REPOSITORY)
      .select(['uid', 'name', 'email', 'status', 'banned'])
      .where('uid', userId);
    return user[0];
  }

  async findByEmail(email) {
    const user = await knex(REPOSITORY)
      .select(['uid', 'name', 'email', 'password', 'role_id', 'status'])
      .where('email', email);
    return user[0];
  }

  async create({ dataUser, dataWallet }) {
    const trx = await knex.transaction();

    try {
      const user = await trx(REPOSITORY)
        .insert(dataUser)
        .returning(['uid', 'name', 'email']);

      await trx(USERWALLET).insert(dataWallet);

      await trx.commit();

      return user[0];
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async updateByUid({ userId, updateData }) {
    const user = await knex(REPOSITORY)
      .where('uid', userId)
      .update(updateData)
      .returning(['uid', 'name', 'email']);
    return user[0];
  }

  async findByUserByUid(params) {
    const user = await knex(REPOSITORY)
      .select(['uid', 'email', 'status', 'banned'])
      .where('uid', params.userId);
    return user[0];
  }
}

export { UsersRepository };
