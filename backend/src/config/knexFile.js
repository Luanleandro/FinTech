const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '../../.env') });

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_LOCAL,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: join(__dirname, '../shared/infra/knex/migrations'),
  },
  seeds: {
    directory: join(__dirname, '../shared/infra/knex/seeds'),
  },
};
