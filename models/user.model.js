const db = require('../config/mongo.db');

const { isEmail } = require('validator');
const { ADMIN, MANGER, USER } = require('../utilities/userRoles');

const Schema = new db.Schema({
    firstName: { type: String , required: true, trim: true, minlength: 3 , maxlength: 50 },
    lastName: { type: String , required: true, trim: true, minlength: 3 , maxlength: 50 },
    email: { type: String , required: true, trim: true, minlength: 4 , maxlength: 100, unique: true, validate: [ isEmail, 'fail must be a valid email address']},
    password: { type: String , required: true, trim: true, minlength: 6 , maxlength: 100 },
    token: { type: String },
    role: { type: String, enum: [ ADMIN, MANGER, USER ], default: USER },
    avatar: { type: String, default: 'uploads/profile.jpg' }
});

module.exports = db.model('user', Schema);