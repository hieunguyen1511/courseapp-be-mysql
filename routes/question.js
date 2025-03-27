const express = require('express');
const questionController = require('../controllers/questionController');
const router = express.Router();
const {checkAuth} = require('../middleware/check-auth');

router.get('/',checkAuth, questionController.index);
router.get('/get/:id',checkAuth,questionController.getById);
router.post('/create',checkAuth, questionController.create);
router.put('/update/:id',checkAuth, questionController.update);
router.delete('/remove/:id',checkAuth, questionController.remove);
router.get('/getByLesson/:lesson_id',checkAuth, questionController.get_question_by_lesson);


module.exports = router;