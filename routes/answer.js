const express = require('express');
const answerController = require('../controllers/answerController');
const router = express.Router();
const { checkAuth } = require('../middleware/check-auth');

router.get('/',checkAuth, answerController.index);
router.get('/get/:id',checkAuth,answerController.getById);
router.post('/create',checkAuth, answerController.create);
router.put('/update/:id',checkAuth, answerController.update);
router.delete('/remove/:id',checkAuth, answerController.remove);
router.get('/getByQuestion/:question_id',checkAuth, answerController.getByQuestion);


module.exports = router;