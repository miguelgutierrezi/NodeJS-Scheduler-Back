const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader || token == null) {
        return res.status(401).send({
            message: 'No auth header was provided'
        });
    }

    try {
        const payload = jwt.verify(token, req.body.date);
        console.log(payload);
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'No valid token was provided'
        });
    }
};
