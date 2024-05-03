const db = require('../config/mongo.db');

const Schema = new db.Schema({
    title: {type: String, required: true , trim: true},
    price: {type: Number, required: true , min: 0, default: 0}
}, { timestamps: true });

module.exports = db.model('courses', Schema);