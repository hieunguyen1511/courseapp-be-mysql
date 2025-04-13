const express = require('express');
const { checkAuth } = require('../middleware/check-auth');
const enrollmentController = require('../controllers/enrollmentController');

const router = express.Router();

router.get('/', checkAuth, enrollmentController.index);
router.post('/create', checkAuth, enrollmentController.create);
router.get('/get/:id', checkAuth, enrollmentController.getById);
router.get(
  '/getByCourse/:course_id',
  checkAuth,
  enrollmentController.getByCourse,
);
router.get('/getByUser/:user_id', checkAuth, enrollmentController.getByUser);
router.put('/update/:id', checkAuth, enrollmentController.update);
router.delete('/remove/:id', checkAuth, enrollmentController.remove);
router.get(
  '/getByIdWithCourse/:id',
  checkAuth,
  enrollmentController.getById_withCourse,
);
router.get(
  '/inProgress',
  checkAuth,
  enrollmentController.getMyInProgressEnrollments,
);
router.get(
  '/completed',
  checkAuth,
  enrollmentController.getMyCompletedEnrollments,
);
router.get(
  '/getByCourseWithUserEnrollmentLessons/:course_id',
  checkAuth,
  enrollmentController.getByCourseWithUserEnrollmentLessons,
);

router.post(
  '/updateEnrollmentWithRatingReview',
  checkAuth,
  enrollmentController.updateEnrollment_with_rating_review,
);
router.get(
  '/getEnrollmentByUserId_JWT',
  checkAuth,
  enrollmentController.getEnrollmentByUserId_JWT,
);
router.get('/getByUserId_JWT', checkAuth, enrollmentController.getByUserId_JWT);
router.get(
  '/getByUserWithCourseAndCategory/:id',
  checkAuth,
  enrollmentController.getByUserWithCourseAndCategory,
);
router.get(
  '/get_last_access_enrollment',
  checkAuth,
  enrollmentController.get_last_access_enrollment,
);
router.get(
  '/getMyCompletedEnrollments_limit_info',
  checkAuth,
  enrollmentController.getMyCompletedEnrollments_limit_info,
);
router.get(
  '/getMyInProgressEnrollments_limit_info',
  checkAuth,
  enrollmentController.getMyInProgressEnrollments_limit_info,
);
router.get(
  '/getById_limit_info/:id',
  checkAuth,
  enrollmentController.getById_limit_info,
);
module.exports = router;
