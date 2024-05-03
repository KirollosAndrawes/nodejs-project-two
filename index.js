const express = require('express');
const app = express();

require('dotenv').config();

/* -----------------------------{ CORS }----------------------------- */
const cors = require('cors');
app.use(cors())

/* -----------------------------{ STATIC }----------------------------- */
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

/* -----------------------------{ Middlewares }----------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* -----------------------------{ Routes }----------------------------- */
app.use('/api/courses', require('./routes/courses.route'));
app.use('/api/users', require('./routes/users.route'));

const  { ERROR } = require('./utilities/httpStatusText');
app.all('*', function(request, response) {
    response.status(404).json({ status: ERROR, message: "this recourse is not available", statusCode: 404 })
})

const catchError = require('./utilities/catchError');
app.use((error, request, response, next) => {
    catchError(error.message, response, "error", 400);
})

/* -----------------------------{ Listening }----------------------------- */
const PORT = process.env.PORT || 3010;
app.listen(PORT, function() {
    console.log('listening on port', PORT);
})