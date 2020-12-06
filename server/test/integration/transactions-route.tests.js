const expect = require('chai').expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const { DebitType } = require('../../src/models/transaction-types');
const transactions = require('../../src/data/transactions');
const supertest = require('supertest');
const app = require('../../src/app');

const server = supertest(app);

describe('Transactions API', function () {

  afterEach(function () {
    sandbox.restore();
  });

  it('Returns all transactions', async function () {
    const response = await server.get('/api/transactions');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.include.members(transactions.map(transactionToResponse));
  });

  it('Adds new Transaction successfully', async function () {
    const newTransaction = { amount: 10, type: DebitType };
    const response = await server.post('/api/transactions').send(newTransaction);

    expect(response.status).to.equal(200);
    expect(response.body).to.include(newTransaction);
    expect(response.body.id).to.not.be.empty;
    expect(response.body.effectiveDate).to.not.be.empty;
  });

  it('Adding invalid Transaction returns error', async function () {
    const response = await server.post('/api/transactions').send({});

    expect(response.status).to.equal(400);
    expect(response.body.validation).to.not.be.undefined;
    expect(response.body.validation.map(x => x.message)).to.include('"amount" is required', '"type" is required');
  });

});

const transactionToResponse = transaction => {
  const response = Object.assign({}, transaction);
  response.effectiveDate = transaction.effectiveDate.toJSON();
  return response;
}