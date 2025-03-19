const express = require('express');
const questionController = require('../controllers/questionController');
const router = express.Router();

router.get('/', questionController.index);
router.get('/get/:id',questionController.getById);
router.post('/create', questionController.create);
router.put('/update/:id', questionController.update);
router.delete('/remove/:id', questionController.remove);
router.get('/getByLesson/:lesson_id', questionController.get_question_by_lesson);


module.exports = router;