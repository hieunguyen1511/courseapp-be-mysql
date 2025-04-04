const express = require('express');
const { checkAuth } = require('../middleware/check-auth');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/', checkAuth, courseController.index);
router.post('/create', checkAuth, courseController.create);
router.get('/all', checkAuth, courseController.getAll);
router.get('/get/:id', checkAuth, courseController.getById);
router.get('/getByCategory/:id', checkAuth, courseController.getByIdCategory);
router.get('/getByUser/:id', checkAuth, courseController.getByIdUser);
router.put('/update/:id', checkAuth, courseController.update);
router.delete('/remove/:id', checkAuth, courseController.remove);
router.get('/top-popular', checkAuth, courseController.getPopularCourses);
router.get('/suggested', checkAuth, courseController.getSuggestedCourses);

module.exports = router;
