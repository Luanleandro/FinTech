/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.uuid('uid').unique().notNullable();
      table.string('name').notNullable();
      table.string('password').notNullable();
      table.string('email').unique().notNullable();
      table.string('avatar');
      table.enum('role', ['USER', 'ADMIN']).notNullable();
      table.timestamps(true, true);
    })
    .createTable('transactions', table => {
      table.increments('id').primary();
      table.uuid('user_id').references('uid').inTable('users');
      table.decimal('value').notNullable();
      table.enum('type', ['INCOME', 'EXPENSE']).notNullable();
      table.timestamps(true, true);
    })
    .createTable('credit_requests', table => {
      table.increments('id').primary();
      table.uuid('user_id').references('uid').inTable('users');
      table.decimal('value').notNullable();
      table.enum('status', ['PENDING', 'REJECT', 'ACCEPT']).notNullable();
      table.enum('type', ['INCOME', 'EXPENSE']).notNullable();

      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('credit_requests')
    .dropTableIfExists('transactions')
    .dropTableIfExists('users');
};
