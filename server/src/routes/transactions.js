const express = require('express');
const transactionsService = require('../services/transactions-service');
const router = express.Router();
const validationHandler = require('./../middleware/validation-handler');
const transactionSchema = require('./../data/validation/transaction-schema');

router.get('/', (req, res) => {
  const transactions = transactionsService.getAll();
  res.json(transactions);
});

router.get('/:id', (req, res) => {
  const transaction = transactionsService.getById(req.params.id);
  if (transaction) {
    res.json(transaction);
    return;
  }
  res.status(404).send();
});

router.post('/', validationHandler(transactionSchema), (req, res) => {
  const transaction = req.body;
  const addedTransaction = transactionsService.add(transaction);
  res.json(addedTransaction);
});

module.exports = router;