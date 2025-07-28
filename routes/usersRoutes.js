const express = require('express');
const UsersController = require('../controllers/usersController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/users', authMiddleware.authenticateToken, UsersController.getAllUsers);
router.get('/users/:id', authMiddleware.authenticateToken, UsersController.getUserById);
router.post('/users', UsersController.createUser);
router.put('/users/:id', authMiddleware.authenticateToken, UsersController.updateUser);
router.delete('/users/:id', authMiddleware.authenticateToken, UsersController.deleteUser);
router.post('/users/login', UsersController.login);

module.exports = router;