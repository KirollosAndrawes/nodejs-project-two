const catchError = require('../utilities/catchError');

module.exports = function(...roles) {
    // console.log(roles)
    return (request, response, next) => {
        if(roles.includes(request.currentUser.role)) {
            next()
        } else {
            return catchError('this role is not authorized', response, 'fail', 401);
        }  
    }
}