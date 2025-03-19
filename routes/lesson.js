const express = require('express');

const lessonController = require('../controllers/lessonController');

const router = express.Router();

router.get('/',lessonController.index);
router.post('/create', lessonController.create);
router.get('/all',lessonController.getAll);
router.get('/getBySection/:id', lessonController.getByIdSection);
router.put('/update/:id', lessonController.update);
router.delete('/remove/:id', lessonController.remove);

module.exports = router;