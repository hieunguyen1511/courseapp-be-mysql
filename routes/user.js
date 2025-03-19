const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',userController.index);

router.get('/all',userController.getAll);

router.post('/register',userController.register);

router.post('/login',userController.login);

router.get('/getAll',userController.getAll);



module.exports = router;