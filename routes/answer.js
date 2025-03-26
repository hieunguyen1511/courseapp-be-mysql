const express = require('express');
const answerController = require('../controllers/answerController');
const router = express.Router();

router.get('/', answerController.index);
router.get('/get/:id',answerController.getById);
router.post('/create', answerController.create);
router.put('/update/:id', answerController.update);
router.delete('/remove/:id', answerController.remove);
router.get('/getByQuestion/:question_id', answerController.getByQuestion);


module.exports = router;