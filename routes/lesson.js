const express = require('express');
const {checkAuth} = require('../middleware/check-auth');
const lessonController = require('../controllers/lessonController');

const router = express.Router();

router.get('/',checkAuth,lessonController.index);
router.post('/create',checkAuth, lessonController.create);
router.get('/all',checkAuth,lessonController.getAll);
router.get('/getBySection/:id',checkAuth, lessonController.getByIdSection);
router.put('/update/:id',checkAuth, lessonController.update);
router.delete('/remove/:id',checkAuth, lessonController.remove);

module.exports = router;