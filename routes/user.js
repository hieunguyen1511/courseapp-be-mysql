const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',userController.index);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/all',userController.getAll);
router.get('/get/:id', userController.getById);
router.put('/update/:id', userController.update);
router.delete('/remove/:id', userController.remove);

module.exports = router;