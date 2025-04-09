const Validator = require('fastest-validator');
const { resource } = require('../app');
const models = require('../models');
const { Op, Sequelize } = require('sequelize');

const Enrollment = models.Enrollment;
const User = models.User;
const EnrollmentLesson = models.EnrollmentLesson;
const lesson = models.lesson;
const v = new Validator();

const USER_ROLE = {
  ADMIN: 0,
  USER: 1,
};

const schema = {
  course_id: { type: 'number', integer: true, required: true },
  user_id: { type: 'number', integer: true, required: true },
  complete_lesson: { type: 'number', integer: true, default: 0 },
  rating: { type: 'number', optional: true, default: null },
  review: { type: 'string', optional: true, default: null },
};
async function getMyCompletedEnrollments(req, res) {
  try {
    const { userId } = req.userData;
    const enrollments = await Enrollment.findAll({
      where: {
        user_id: userId,
        completed_at: { [Op.not]: null },
      },
      attributes: [
        'id',
        'course_id',
        'user_id',
        'last_access',
        'price',
        'rating',
        'review',
        'completed_at',
        'createdAt',
        'updatedAt',
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM EnrollmentLessons WHERE EnrollmentLessons.enrollment_id = Enrollment.id AND EnrollmentLessons.completed_at IS NOT NULL)`,
          ),
          'total_lesson_completed',
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM Lessons WHERE Lessons.section_id IN (SELECT id FROM Sections WHERE Sections.course_id = Enrollment.course_id))`,
          ),
          'total_lesson',
        ],
      ],
      include: [
        {
          model: models.Course,
          as: 'course',
          required: true,
          include: [
            {
              model: models.Category,
              as: 'category',
              required: true,
            },
          ],
        },
        {
          model: models.EnrollmentLesson,
          as: 'enrollment_lessons',
          attributes: [],
        },
      ],
      order: [['id', 'DESC']],
    });

    return res
      .status(200)
      .json({ message: 'Enrollments fetched successfully', enrollments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching enrollments', error: error.message });
  }
}

async function getMyInProgressEnrollments(req, res) {
  try {
    const { userId } = req.userData;
    const enrollments = await Enrollment.findAll({
      where: {
        user_id: userId,
        completed_at: { [Op.eq]: null },
      },
      attributes: [
        'id',
        'course_id',
        'user_id',
        'last_access',
        'price',
        'rating',
        'review',
        'completed_at',
        'createdAt',
        'updatedAt',
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM EnrollmentLessons WHERE EnrollmentLessons.enrollment_id = Enrollment.id AND EnrollmentLessons.completed_at IS NOT NULL)`,
          ),
          'total_lesson_completed',
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM Lessons WHERE Lessons.section_id IN (SELECT id FROM Sections WHERE Sections.course_id = Enrollment.course_id))`,
          ),
          'total_lesson',
        ],
      ],
      include: [
        {
          model: models.Course,
          as: 'course',
          required: true,
          include: [
            {
              model: models.Category,
              as: 'category',
              required: true,
            },
          ],
        },
      ],
      order: [['id', 'DESC']],
    });
    return res
      .status(200)
      .json({ message: 'Enrollments fetched successfully', enrollments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching enrollments', error: error.message });
  }
}

function index(req, res) {
  const enrollment = 'Enrollment';
  res.send('Hello ' + enrollment);
}

/**
 * @openapi
 * /api/enrollment/get-by-id:
 *  get:
 *     tags:
 *     - Enrollment Controller
 *     description: Get all enrollments
 *     responses:
 *       200:
 *         description: Get all enrollments successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 enrollments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       course_id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       complete_lesson:
 *                         type: number
 *                       rating:
 *                         type: number
 *                       review:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function getById(req, res) {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: models.Course,
          as: 'course',
          required: true,
          include: [
            {
              model: models.Category,
              as: 'category',
              required: true,
            },
            {
              model: models.Section,
              as: 'sections',
              include: [
                {
                  model: models.Lesson,
                  as: 'lessons',
                  order: [['id', 'ASC']],
                },
              ],
            },
            {
              model: models.Comments,
              as: 'comments',
              include: [
                {
                  model: models.User,
                  as: 'user',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          model: models.EnrollmentLesson,
          as: 'enrollment_lessons',
          attributes: ['lesson_id', 'completed_at'],
        },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    Enrollment.update(
      {
        last_access: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    return res.status(200).json({
      message: `Get enrollment by ID successfully`,
      enrollment,
    });
  } catch (error) {
    console.error('Error getting enrollment by ID:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/enrollment/get-by-course:
 *  get:
 *     tags:
 *     - Enrollment Controller
 *     description: Get enrollments by course
 *     parameters:
 *       - name: course_id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Get enrollments by course successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 enrollments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       course_id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       complete_lesson:
 *                         type: number
 *                       rating:
 *                         type: number
 *                       review:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function getByCourse(req, res) {
  try {
    const { course_id } = req.params;
    const enrollments = await Enrollment.findAll({
      where: { course_id: course_id },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    return res
      .status(200)
      .json({ message: 'Get enrollments by course successfully', enrollments });
  } catch (error) {
    console.error('Error getting enrollments by course:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/enrollment/get-by-user:
 *  get:
 *     tags:
 *     - Enrollment Controller
 *     description: Get enrollments by user
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Get enrollments by user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 enrollments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       course_id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       complete_lesson:
 *                         type: number
 *                       rating:
 *                         type: number
 *                       review:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function getByUser(req, res) {
  try {
    const { user_id } = req.params;
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: models.Course,
          as: 'course',
          required: true,
        },
      ],
      where: { user_id: user_id },
    });

    return res
      .status(200)
      .json({ message: `Get enrollments by user successfully`, enrollments });
  } catch (error) {
    console.error('Error getting enrollments by user:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

async function getByUserId_JWT(req, res) {
  try {
    const { userId } = req.userData;
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: models.Course,
          as: 'course',
          required: true,
        },
      ],
      where: { user_id: userId },
    });

    return res
      .status(200)
      .json({ message: `Get enrollments by user successfully`, enrollments });
  } catch (error) {
    console.error('Error getting enrollments by user:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

/**
 * @openapi
 * /api/enrollment/create:
 *  post:
 *     tags:
 *     - Enrollment Controller
 *     description: Create a new enrollment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: number
 *                 user_id:
 *                 type: number
 *               total_lesson:
 *                 type: number
 *               complete_lesson:
 *                 type: number
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 enrollment:
 *                    type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     course_id:
 *                       type: number
 *                     user_id:
 *                       type: number
 *                     total_lesson:
 *                       type: number
 *                     complete_lesson:
 *                       type: number
 *                     price:
 *                       type: number
 *                     rating:
 *                       type: number
 *                     review:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function create(req, res) {
  try {
    const {
      course_id,
      user_id: inputUserId,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    } = req.body;

    let user_id = inputUserId;
    const { userId: authUserId, role: authUserRole } = req.userData;

    if (authUserRole !== USER_ROLE.ADMIN) {
      user_id = authUserId;
    }

    const enrollment = await Enrollment.create({
      course_id,
      user_id,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    });
    return res
      .status(201)
      .json({ message: 'Enrollment created successfully', enrollment });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/enrollment/update:
 *  put:
 *     tags:
 *     - Enrollment Controller
 *     description: Update an enrollment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 enrollment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     course_id:
 *                       type: number
 *                     user_id:
 *                       type: number
 *                     total_lesson:
 *                       type: number
 *                     complete_lesson:
 *                       type: number
 *                     price:
 *                       type: number
 *                     rating:
 *                       type: number
 *                     review:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function update(req, res) {
  try {
    const validationResponse = v.validate(req.body, schema);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationResponse,
      });
    }
    const { id } = req.params;
    const {
      course_id,
      user_id,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    await enrollment.update({
      course_id,
      user_id,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    });

    return res
      .status(200)
      .json({ message: 'Enrollment updated successfully', enrollment });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/enrollment/delete:
 *  delete:
 *     tags:
 *     - Enrollment Controller
 *     description: Delete an enrollment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Enrollment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function remove(req, res) {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    await enrollment.destroy();
    return res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

async function getById_withCourse(req, res) {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: models.Course,
          as: 'course',
        },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    return res.status(200).json({
      message: `Get enrollment by ID successfully`,
      enrollment,
    });
  } catch (error) {
    console.error('Error getting enrollment by ID:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

async function updateEnrollment_with_rating_review(req, res) {
  try {
    const { id, rating, review } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    await enrollment.update({
      rating,
      review,
    });

    return res
      .status(200)
      .json({ message: 'Enrollment updated successfully', enrollment });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

async function getEnrollmentByUserId_JWT(req, res) {
  try {
    const { userId } = req.userData;
    const enrollments = await Enrollment.findAll({
      where: { user_id: userId },
      include: [
        {
          model: models.Course,
          as: 'course',
        },
      ],
    });

    return res
      .status(200)
      .json({ message: 'Get enrollments by user successfully', enrollments });
  } catch (error) {
    console.error('Error getting enrollments by user:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
async function getByUserWithCourseAndCategory(req, res) {
  try {
    const { id } = req.params;
    const enrollments = await Enrollment.findAll({
      where: {
        user_id: id,
        completed_at: { [Op.not]: null },
      },
      attributes: [
        'id',
        'course_id',
        'user_id',
        'last_access',
        'price',
        'rating',
        'review',
        'completed_at',
        'createdAt',
        'updatedAt',
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM EnrollmentLessons WHERE EnrollmentLessons.enrollment_id = Enrollment.id AND EnrollmentLessons.completed_at IS NOT NULL)`,
          ),
          'total_lesson_completed',
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM Lessons WHERE Lessons.section_id IN (SELECT id FROM Sections WHERE Sections.course_id = Enrollment.course_id))`,
          ),
          'total_lesson',
        ],
      ],
      include: [
        {
          model: models.Course,
          as: 'course',
          required: true,
          include: [
            {
              model: models.Category,
              as: 'category',
              required: true,
            },
          ],
        },
        {
          model: models.EnrollmentLesson,
          as: 'enrollment_lessons',
          attributes: [],
        },
      ],
      order: [['id', 'DESC']],
    });

    return res
      .status(200)
      .json({ message: 'Enrollments fetched successfully', enrollments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching enrollments', error: error.message });
  }
}
async function getByCourseWithUserEnrollmentLessons(req, res) {
  try {
    const { course_id } = req.params;

    const enrollments = await Enrollment.findAll({
      where: { course_id },
      attributes: [
        'id',
        'course_id',
        'user_id',
        'last_access',
        'price',
        'rating',
        'review',
        'completed_at',
        'createdAt',
        'updatedAt',
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM EnrollmentLessons WHERE EnrollmentLessons.enrollment_id = Enrollment.id AND EnrollmentLessons.completed_at IS NOT NULL)`,
          ),
          'total_lesson_completed',
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM Lessons WHERE Lessons.section_id IN (SELECT id FROM Sections WHERE Sections.course_id = Enrollment.course_id))`,
          ),
          'total_lesson',
        ],
      ],
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: EnrollmentLesson,
          as: 'enrollment_lessons', // alias phải đúng trong define
        },
      ],
    });
    return res.status(200).json({
      message: 'Get enrollments with lessons by course successfully',
      enrollments,
    });
  } catch (error) {
    console.error('Error getting enrollments with lessons:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

module.exports = {
  index,
  getById,
  getByCourse,
  getByUser,
  create,
  update,
  remove,
  getById_withCourse,
  getMyInProgressEnrollments,
  getMyCompletedEnrollments,
  updateEnrollment_with_rating_review,
  getEnrollmentByUserId_JWT,
  getByUserId_JWT,
  getByUserWithCourseAndCategory,
  getByCourseWithUserEnrollmentLessons,
};
