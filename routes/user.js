const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
const { checkAuth } = require('../middleware/check-auth');
router.get('/', userController.index);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', checkAuth, userController.getAll);
router.get('/get/:id', checkAuth, userController.getById);
router.put('/update/:id', checkAuth, userController.update);
router.delete('/remove/:id', checkAuth, userController.remove);
router.post('/refresh-token', userController.refreshToken);
module.exports = router;
