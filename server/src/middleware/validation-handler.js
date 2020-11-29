module.exports = (schema) => (req, res, next) => {
    const options = {
        abortEarly: false
    };

    const result = schema.validate(req.body, options); 
    if (result.error == null) {
        return next();
    }

    next(result.error.details);
};