const knexFile = require('@config/knexFile');
const knex = require('knex')(knexFile);

export default knex;
