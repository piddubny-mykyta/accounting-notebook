module.exports = (schema) => (req, res, next) => {
    const options = {
        abortEarly: false
    };

    const result = schema.validate(req.body, options); 
    if (result.error == null) {
        return next();
    }

    res.status(400).json({ validation: result.error.details });
};