const express = require('express');
const {checkAuth} = require('../middleware/check-auth');
const commentController = require('../controllers/commentController');

const router = express.Router();



router.get('/',checkAuth, commentController.index);
router.get('/get/:id',checkAuth, commentController.getById);
router.get('/getByCourse/:course_id',checkAuth, commentController.getByCourse);
router.get('/getByUser/:user_id',checkAuth, commentController.getByUser);
router.post('/create',checkAuth, commentController.create);
router.put('/update/:id',checkAuth, commentController.update);
router.delete('/remove/:id',checkAuth, commentController.remove);
router.get('/getByCourseWithUser/:course_id',checkAuth, commentController.getByCourseId_withUser);
module.exports = router;