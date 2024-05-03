const jwt = require('jsonwebtoken');

module.exports = async function(payload, expiresIn) {
    return await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expiresIn });
}