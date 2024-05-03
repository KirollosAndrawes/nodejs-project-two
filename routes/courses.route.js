const express = require('express');
const router = express.Router();

const { getAllCourses, getCourseById, createCourse, updateCourseById, deleteCourseById } = require('../controllers/courses.controller');

const { ADMIN, MANGER } = require('../utilities/userRoles')

const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');

router.route('/')
.get(getAllCourses)
.post(verifyToken, allowedTo(ADMIN, MANGER), createCourse);

router.route('/:courseId')
.get(getCourseById)
.put(updateCourseById)
.delete(verifyToken, allowedTo(ADMIN, MANGER), deleteCourseById);


module.exports = router;