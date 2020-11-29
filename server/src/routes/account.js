const express = require('express');
const transactionsService = require('../services/transactions-service');
const router = express.Router();

router.get('/', (req, res) => {
  const currentBalance = transactionsService.getCurrentBalance();
  res.json({ currentBalance });
});

module.exports = router;