const express = require('express');

const commentController = require('../controllers/commentController');

const router = express.Router();

router.get('/', commentController.index);
router.get('/get/:id', commentController.getById);
router.get('/getByCourse/:course_id', commentController.getByCourse);
router.get('/getByUser/:user_id', commentController.getByUser);
router.post('/create', commentController.create);
router.put('/update/:id', commentController.update);
router.delete('/remove/:id', commentController.remove);

module.exports = router;