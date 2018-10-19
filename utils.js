const bluebird = require('bluebird');

module.exports = {
  afterCreate
}

function afterCreate(connection, done) {
  const transactionTimeoutMillis = 3 * 1000;

  const setTransactionTimeOut = `SET SESSION idle_in_transaction_session_timeout = ${transactionTimeoutMillis}`;
  
  const asyncConnection = bluebird.promisifyAll(connection);
  
  return asyncConnection.queryAsync(setTransactionTimeOut)
    .then(() => done())
    .catch((err) => done(err, connection))
  ;
}