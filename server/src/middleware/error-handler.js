const InvalidOperation = require('./../exceptions/invalid-operation');

module.exports = (err, req, res, next) => {
    if (err instanceof InvalidOperation) {
        res.status(400).json({ error: err.message });
        return;
    }

    res.status(500).json({ error: err });
};