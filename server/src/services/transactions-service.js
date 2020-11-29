const { CreditType, DebitType } = require('../models/transaction-types');
const InvalidOperation = require('./../exceptions/invalid-operation');
const transactions = require('./../data/transactions');
const { v4: uuidv4 } = require('uuid');

class TransactionsService {

  getAll() {
    return transactions;
  }

  getById(id) {
    return transactions.find(x => x.id == id);
  }

  add(transaction) {
    const currentBallance = this.getCurrentBalance();
    const amountChange = this.getAmountChangeByType(transaction.amount, transaction.type);

    if (currentBallance + amountChange < 0) {
      throw new InvalidOperation('Operation refused. Negative account balance is not allowed');
    }

    transaction.id = uuidv4();
    transaction.effectiveDate = new Date();

    transactions.push(transaction);

    return transaction;
  }

  getCurrentBalance() {
    const totalDebit = this.getTotalByType(DebitType);
    const totalCredit = this.getTotalByType(CreditType);
    return this.getAmountChangeByType(totalDebit, DebitType) + this.getAmountChangeByType(totalCredit, CreditType);
  }

  getTotalByType(type) {
    return transactions.filter(x => x.type == type).map(x => x.amount).reduce((x, y) => x + y, 0);
  }

  getAmountChangeByType(amount, type) {
    if (type == CreditType) {
      return amount * -1;
    }

    return amount;
  }
}

module.exports = new TransactionsService();