/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_wallet', table => {
    table.increments('id').primary();
    table.uuid('uid').unique().notNullable();
    table.uuid('user_id').references('uid').inTable('users');
    table.integer('balance').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_wallet');
};
