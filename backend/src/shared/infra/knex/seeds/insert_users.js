const bcrypt = require('bcryptjs');
const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '../../.env') });
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const passwordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD);
  const insertData = [
    {
      id: 1,
      uid: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Admin',
      password: passwordHash,
      email: 'admin@admin.com.br',
      avatar: '',
      role_id: 1,
      status: true,
      banned: false,
    },
  ];

  const inserts = [
    knex('users')
      .select('id')
      .whereIn(
        'id',
        insertData.map(i => i.id),
      )
      .then(async info => {
        if (info.length < insertData.length) {
          const result = insertData.filter(item =>
            info.every(i => ![i.id].incluedes(item.id)),
          );
          return knex('users').insert(result);
        }

        await Promise.all(
          insertData.map(i => knex('users').where('id', i.id).update(i)),
        );

        return info;
      }),
  ];

  return Promise.all(inserts);
};
