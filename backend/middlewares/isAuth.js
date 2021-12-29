const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        const error = new Error('not authorized');
        error.statusCode = 403;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken ;

    try {
        decodedToken = jwt.verify(token, "someSecretToken");
    } catch ( err ) {
        const error = new Error('not authenticated');
        error.statusCode = 401;
        throw error
    }
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;

    next()
}