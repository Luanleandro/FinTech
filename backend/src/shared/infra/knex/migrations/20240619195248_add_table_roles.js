/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('roles', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.boolean('status').notNullable();
    })
    .alterTable('users', table => {
      table.dropColumn('role');
      table.integer('role_id').references('id').inTable('roles');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .table('users', table => {
      table.dropColumn('role_id');
      table.enum('role', ['USER', 'ADMIN']);
    })
    .dropTableIfExists('roles');
};
