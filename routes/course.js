const express = require('express');
const { checkAuth } = require('../middleware/check-auth');
const courseController = require('../controllers/courseController');
const { route } = require('./user');

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
router.get(
  '/get/byReferenceCategory/:id',
  checkAuth,
  courseController.getCourseByReferenceCategoryId,
);
router.get(
  '/get/byId_withCountEnrollment/:id',
  checkAuth,
  courseController.getCourseById_withCountEnrollment,
);
router.get(
  '/getCourseByReferenceCategoryId_limit_info/:id',
  checkAuth,
  courseController.getCourseByReferenceCategoryId_limit_info,
);
router.get(
  '/get_all_active_course_for_user_limit_info',
  checkAuth,
  courseController.get_all_active_course_for_user_limit_info,
);

router.get('/search', checkAuth, courseController.searchCoursesByKeyword);

module.exports = router;
