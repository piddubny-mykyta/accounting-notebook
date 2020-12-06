const transactions = require('./transactions');
const { v4: uuidv4 } = require('uuid');

class TransactionsRepository {

  getAll() {
    return transactions;
  }

  getById(id) {
    return transactions.find(x => x.id == id);
  }

  add(transaction) {
    transaction.id = uuidv4();
    transactions.push(transaction);
    return transaction;
  }
}

module.exports = new TransactionsRepository();