const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();
const { checkAuth } = require('../middleware/check-auth');

router.get('/', checkAuth, categoryController.index);
router.post('/create', checkAuth, categoryController.create);
router.get('/all', checkAuth, categoryController.getAll);
router.get('/get/:id', checkAuth, categoryController.getById);
router.put('/update/:id', checkAuth, categoryController.update);
router.delete('/remove/:id', checkAuth, categoryController.remove);

module.exports = router;
