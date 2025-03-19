const express = require('express');

const enrollmentController = require('../controllers/enrollmentController');

const router = express.Router();

router.get('/',enrollmentController.index);
router.post('/create', enrollmentController.create);
router.get('/get/:id', enrollmentController.getById);
router.get('/getByCourse/:course_id', enrollmentController.getByCourse);
router.get('/getByUser/:user_id', enrollmentController.getByUser);
router.put('/update/:id', enrollmentController.update);
router.delete('/remove/:id', enrollmentController.remove);

module.exports = router;