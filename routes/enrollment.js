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
router.get('/getByIdWithCourse/:id',checkAuth, enrollmentController.getById_withCourse);
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

module.exports = router;
