const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

const transactionRoutes = require('./routes/transactions');
const accountRoutes = require('./routes/account');
app.use('/api/transactions', transactionRoutes);
app.use('/api/account', accountRoutes);

const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

// Start
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});