const { CreditType, DebitType } = require('../models/transaction-types');
const InvalidOperation = require('./../exceptions/invalid-operation');
const transactionsRepository = require('./../data/transactions-repository');

class TransactionsService {

  getAll() {
    return transactionsRepository.getAll();
  }

  getById(id) {
    return transactionsRepository.getById(x => x.id == id);
  }

  add(transaction) {
    const currentBallance = this.getCurrentBalance();
    const amountChange = this.getAmountChangeByType(transaction.amount, transaction.type);

    if (currentBallance + amountChange < 0) {
      throw new InvalidOperation('Operation refused. Negative account balance is not allowed');
    }

    transaction.effectiveDate = new Date();

    return transactionsRepository.add(transaction);
  }

  getCurrentBalance() {
    const allTransactions = transactionsRepository.getAll();
    return allTransactions
      .map(x => this.getAmountChangeByType(x.amount, x.type))
      .reduce((x, y) => x + y, 0);
  }

  getAmountChangeByType(amount, type) {
    if (type == CreditType) {
      return amount * -1;
    }

    return amount;
  }
}

module.exports = new TransactionsService();