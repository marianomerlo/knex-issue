const knex = require('knex');
const pg = require('pg');
const sleep = require('await-sleep');

const { afterCreate } =  require('./utils');

const knexConfig = {
  debug:      false,
  client:     'pg',
  connection: {
    host:     '127.0.0.1',
    user:     'postgres',
    password: 'postgres',
    database: 'test'
  },
  pool: {
    min:                      2,
    max:                      100,
    idleTimeoutMillis:        20 * 1000,
    acquireTimeoutMillis:     15 * 1000,
    afterCreate
  }
}

const dbClient = knex(knexConfig);

return knex(knexConfig).transaction((trx) => {
  return dbClient.raw('SELECT 1').transacting(trx)
    .then(async() => await sleep(2000) )
    .then(() => dbClient.raw('SELECT 1').transacting(trx))
}).then(() => process.exit(0));

