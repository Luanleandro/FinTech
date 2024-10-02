/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const insertData = [
    {
      id: 1,
      name: 'ADMIN',
      description: 'Administrador',
      status: true,
    },
    {
      id: 2,
      name: 'MEMBER',
      description: 'Membro',
      status: true,
    },
  ];

  const inserts = [
    knex('roles')
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
          return knex('roles').insert(result);
        }

        await Promise.all(
          insertData.map(i => knex('roles').where('id', i.id).update(i)),
        );

        return info;
      }),
  ];

  return Promise.all(inserts);
};
