const express = require('express');

const sectionController = require('../controllers/sectionController');

const router = express.Router();
const { checkAuth } = require('../middleware/check-auth');

router.get('/', checkAuth, sectionController.index);
router.post('/create', checkAuth, sectionController.create);
router.get('/all', checkAuth, sectionController.getAll);
router.get('/getByCourse/:id', checkAuth, sectionController.getByIdCourse);
router.put('/update/:id', checkAuth, sectionController.update);
router.delete('/remove/:id', checkAuth, sectionController.remove);
router.get(
  '/getByCourseId_withLesson/:course_id',
  checkAuth,
  sectionController.getByCourseId_withLesson,
);
router.get('/getByIdCourseWithLessons/:id', checkAuth, sectionController.getByIdCourseWithLessons);

module.exports = router;
