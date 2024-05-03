const User = require('../models/user.model');

const { ERROR, FAIL, SUCCESS } = require('../utilities/httpStatusText');
const catchError = require('../utilities/catchError');
const generateToken = require('../utilities/generateToken');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.getAllUsers = function(request, response) {


    User.find({}, {'__v': false}).limit(request.query.limit).skip( (request.query.page - 1) * request.query.limit )
    .then(users => {
        if(users && users.length >= 1) {
            response.status(201).json({ status: SUCCESS, data: { users } });
        } else {
            response.status(400).json({ status: FAIL, data: null });
        }
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

module.exports.register = function(request, response) {
    
    User.findOne({ email: request.body.email })
    .then(async user => {

        if( user ) {
            response.status(400).json({ status: ERROR, message: "this email is exists" , statusCode: 400 , data: null});
            catchError("this email is exists", response, ERROR, 400);
        } else {

            // password Hashing
            request.body.password = await bcrypt.hash(request.body.password, 10);

            const newUser = new User({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: request.body.password,
                role: request.body.role,
                avatar: request.file.filename
            })


            // Generate JWT Token
            newUser.token = await generateToken({ email: newUser.email, id: newUser._id, role: newUser.role }, '1m');
            

            newUser.save()
            .then(user => {
                if(user) {
                    response.status(201).json({ status: SUCCESS, data: { user } });
                } else {
                    catchError("something wrong", response, FAIL, 400);
                }
            })
            .catch(error => {
                catchError(error.message, response, ERROR, 400);
            })
        }
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

module.exports.login = function(request, response) {
    User.findOne({ email: request.body.email })
    .then(async user => {
            if(user) {
                
                const matchedPassword = await bcrypt.compare(request.body.password, user.password)

                if(matchedPassword) {
                    // logged in successfully
                    response.status(201).json({ status: SUCCESS, data: { token: await generateToken({ email: user.email, id: user._id, role: user.role }, '1m') } });

                } else {
                    catchError("Invalid email or password", response, FAIL, 400);
                }
            } else {
                catchError("Invalid email or password", response, FAIL, 400);
            }

    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

module.exports.updateUser = function(request, response) {
    User.findByIdAndUpdate(request.params.userId, { password: request.body.password , ...request.body})
    .then(user => {
        if(user) {
            response.status(201).json({ status: SUCCESS, data: { user } });
        } else {
            response.status(400).json({ status: FAIL, data: null });
        }
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

module.exports.deleteUser = function(request, response) {
    User.findByIdAndDelete(request.params.userId)
    .then(user => {
        if(user) {
            response.status(201).json({ status: SUCCESS, data: { user } });
        } else {
            response.status(400).json({ status: FAIL, data: null });
        }
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}