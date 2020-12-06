const expect = require('chai').expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const transactionsRepository = require('../../src/data/transactions-repository');
const { DebitType, CreditType } = require('../../src/models/transaction-types');
const transactionsService = require('../../src/services/transactions-service');

describe('Transactions Service', function () {

  afterEach(function () {
    sandbox.restore();
  });

  describe('getCurrentBalance()', function () {
    it('calculates total balance correctly', function () {
      sandbox.stub(transactionsRepository, 'getAll').returns([
        {
          amount: 35.5,
          type: DebitType
        },
        {
          amount: 14.25,
          type: CreditType
        },
        {
          amount: 34,
          type: DebitType
        }]);
      const totalBalance = transactionsService.getCurrentBalance();

      expect(totalBalance).to.equal(55.25);
    });

    it('no transactions returns 0 balance', function () {
      sandbox.stub(transactionsRepository, 'getAll').returns([]);
      const totalBalance = transactionsService.getCurrentBalance();

      expect(totalBalance).to.equal(0);
    });
  });

  describe('add()', function () {
    it('adds new transaction', function () {
      sandbox.stub(transactionsRepository, 'getAll').returns([]);
      const addMethod = sandbox.spy(transactionsRepository, 'add');
      transactionsService.add({
        amount: 25,
        type: DebitType
      });

      sinon.assert.calledWithMatch(addMethod, sinon.match({ amount: 25, type: DebitType }));
    });

    it('adding transaction that causes negative balance throws error', function () {
      sandbox.stub(transactionsRepository, 'getAll').returns([{
        amount: 10,
        type: DebitType
      }]);

      const call = () => transactionsService.add({
        amount: 15,
        type: CreditType
      });

      expect(call).to.throw('Negative account balance is not allowed');
    });

  });

});