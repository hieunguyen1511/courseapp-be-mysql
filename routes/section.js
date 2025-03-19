const express = require('express');

const sectionController = require('../controllers/sectionController');

const router = express.Router();

router.get('/',sectionController.index);
router.post('/create', sectionController.create);
router.get('/all',sectionController.getAll);
router.get('/getByCourse/:id', sectionController.getByIdCourse);
router.put('/update/:id', sectionController.update);
router.delete('/remove/:id', sectionController.remove);

module.exports = router;