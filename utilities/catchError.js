module.exports = (error, response, status, code = 500) => {
    response.status(code).json({ status: status, message: error, data: null, statusCode: code });
}