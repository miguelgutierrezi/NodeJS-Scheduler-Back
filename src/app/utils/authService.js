const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader || token == null) {
        return res.status(401).send({
            message: 'No auth header was provided'
        });
    }

    if (!req.body.date) {
        return res.status(400).send({
            message: 'date argument is required'
        });
    }

    try {
        const payload = jwt.verify(token, req.body.date);
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'No valid token was provided'
        });
    }
};
