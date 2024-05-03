const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken')
const upload = require('../utilities/multerUpload');

const { getAllUsers, register, login, deleteUser } = require('../controllers/users.controller');

router.get('/', verifyToken, getAllUsers);
router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.delete('/:userId', deleteUser);


module.exports = router;