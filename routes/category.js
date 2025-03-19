const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/',categoryController.index);
router.post('/create', categoryController.create);
router.get('/all',categoryController.getAll);
router.get('/get/:id', categoryController.getById);
router.put('/update/:id', categoryController.update);
router.delete('/remove/:id', categoryController.remove);

module.exports = router;