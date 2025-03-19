const express = require('express');

const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/',courseController.index);
router.post('/create', courseController.create);
router.get('/all',courseController.getAll);
router.get('/get/:id', courseController.getById);
router.get('/getByCategory/:id', courseController.getByIdCategory);
router.put('/update/:id', courseController.update);
router.delete('/remove/:id', courseController.remove);

module.exports = router;