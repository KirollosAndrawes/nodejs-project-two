const jwt = require('jsonwebtoken');

const catchError = require('../utilities/catchError');

module.exports = ( request, response, next ) => {
    const authHeader = request.headers['Authorization'] || request.headers['authorization'];
    if(authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            request.currentUser = decodedToken;
            next();
        } catch(error) {
            return catchError(error.message, response, "error", 401)
        }
    } else {
        return catchError("token is required", response, "error", 401)
    }
}