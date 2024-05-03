const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL;
const mongoName = process.env.MONGODB_NAME;

mongoose.connect(mongoURL, {
    dbName: mongoName
})
.then(() => {
    console.log('Mongodb server start');
})
.catch(error => {
    console.log('Error:', error);
})

module.exports = mongoose;