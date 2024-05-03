const Courses = require('../models/course.model');

const  { SUCCESS, FAIL, ERROR } = require('../utilities/httpStatusText');

const catchError = require('../utilities/catchError');


/* Start Controllers */

const getAllCourses = function(request, response) {
    Courses.find({},  {"__v": false}).skip((request.query.page - 1) * request.query.limit).limit(request.query.limit)
    .then(allCourses => {
        if(allCourses && allCourses.length >= 1) {

            response.status(201).json({ status: SUCCESS, data: { courses: allCourses } });
        } else {
            response.status(404).json({ status: FAIL, data: { courses: null } });
        }
        
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

const getCourseById = function(request, response) {
    Courses.findById(request.params.courseId)
    .then(course => {
        if(course) {
            response.status(201).json({ status: SUCCESS, data: { course } });
        } else {
            response.status(404).json({ status: FAIL, data: { course: null } });
        }
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    });
}

const createCourse = function(request, response) {
    Courses.create(request.body)
    .then(newCourse => {
        if(newCourse) {
            response.status(201).json({ status: SUCCESS, data: { course: newCourse } });
        } else {
            response.status(404).json({ status: FAIL, data: { course: null } });
        }
        
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

const updateCourseById = function(request, response) {
    Courses.findByIdAndUpdate(request.params.courseId,request.body, {new: true})
    .then(updateCourse => {
        if(updateCourse) {
            response.status(201).json({ status: SUCCESS, data: { course: updateCourse } });
        } else {
            response.status(404).json({ status: FAIL, data: { course: null } });
        }
    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

const deleteCourseById = function(request, response) {
    Courses.findByIdAndDelete(request.params.courseId)
    .then(deletedCourse => {
        if(deletedCourse) {
            response.status(201).json({ status: SUCCESS, data: null });
        } else {
            response.status(404).json({ status: FAIL, data: { course: null } });
        }

    })
    .catch(error => {
        catchError(error.message, response, ERROR, 400);
    })
}

/* End Controllers */

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
};