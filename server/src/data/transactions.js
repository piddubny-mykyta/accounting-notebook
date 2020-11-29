const { v4: uuidv4 } = require('uuid');
const { DebitType, CreditType } = require('../models/transaction-types');

module.exports = [
  {
    id: uuidv4(),
    type: DebitType,
    amount: 150,
    effectiveDate: new Date()
  },
  {
    id: uuidv4(),
    type: DebitType,
    amount: 7.25,
    effectiveDate: new Date()
  },
  {
    id: uuidv4(),
    type: CreditType,
    amount: 53.75,
    effectiveDate: new Date()
  },
  {
    id: uuidv4(),
    type: DebitType,
    amount: 10.5,
    effectiveDate: new Date()
  },
  {
    id: uuidv4(),
    type: CreditType,
    amount: 37.5,
    effectiveDate: new Date()
  }
];