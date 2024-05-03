// Not USE IN This project

module.exports = (errorFun) => {
    return (request, response, next) => {
        error(request, response, next).catch( error => {
            next(error);
        })
    }
}