const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
const { checkAuth } = require('../middleware/check-auth');
router.get('/', userController.index);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', checkAuth, userController.getAll);
router.get('/get/:id', checkAuth, userController.getById);
router.get(
  '/getAllUsersWithoutAdmin',
  checkAuth,
  userController.getAllUsersWithoutAdmin,
);
router.put('/update/:id', checkAuth, userController.update);
router.delete('/remove/:id', checkAuth, userController.remove);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);
router.get(
  '/getUserInformationByJWT',
  checkAuth,
  userController.getUserInformationByJWT,
);
router.put('/updateUserInfo_JWT', checkAuth, userController.updateUserInfo_JWT);
router.put('/updateAvatar_JWT', checkAuth, userController.updateAvatar_JWT);
router.put('/changePassword', checkAuth, userController.changePassword_JWT);

router.post('/sendOTP', userController.sendOTP);
router.post('/verifyOTP', userController.verifyOTP);
router.post('/updateUserPassword', userController.updateUserPassword);

router.post('/googleSignIn', userController.googleSignIn);

module.exports = router;
