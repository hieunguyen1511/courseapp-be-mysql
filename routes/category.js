const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/',categoryController.index);

router.get('/all',categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post('/create', categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

module.exports = router;