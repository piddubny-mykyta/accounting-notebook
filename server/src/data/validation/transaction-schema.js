const Joi = require('joi');
const { DebitType, CreditType } = require('../../models/transaction-types');

module.exports = Joi.object().keys({
    amount: Joi.number().required(),
    type: Joi.string().required().valid(DebitType, CreditType)
});