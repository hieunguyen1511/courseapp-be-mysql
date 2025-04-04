const Validator = require('fastest-validator');
const { resource } = require('../app');

const { Course, Category, Enrollment, sequelize } = require('../models');
const { Sequelize, where } = require('sequelize');

function index(req, res) {
  const course = 'khóa học';
  res.send('Hello ' + course);
}
/**
 * @openapi
 * /api/courses/get-all:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all courses
 *     description: Get all courses
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
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
async function getAll(req, res) {
  try {
    const courses = await Course.findAll({
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('enrollments.id')),
            'enrollment_count',
          ],
        ],
      },
      include: [
        {
          model: Category, // Chắc chắn rằng Category được import từ models
          attributes: ['id', 'name'],
          as: 'category',
        },
        {
          model: Enrollment,
          attributes: [], // Không cần lấy chi tiết Enrollment, chỉ đếm số lượng
          as: 'enrollments',
        },
      ],
      group: ['Course.id', 'category.id'],
    });

    return res.status(200).json({
      message: 'Get all courses successfully',
      courses,
    });
  } catch (error) {
    console.error('Error getting all courses:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}
/**
 * @openapi
 * /api/courses/top-popular:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get top popular courses
 *     description: Get top popular courses
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
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
async function getPopularCourses(req, res) {
  try {
    const { limit } = req.query;

    const courses = await Course.findAll({
      attributes: [
        'id',
        'category_id',
        'name',
        'description',
        'status',
        'price',
        'discount',
        'image',
        'total_rating',
        'createdAt',
        'updatedAt',
        [
          sequelize.literal(
            '(SELECT COUNT(1) FROM Enrollments WHERE Enrollments.course_id = Course.id)',
          ),
          'enrollment_count',
        ],
      ],
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'category',
        },
      ],
      order: [['total_rating', 'DESC']],
      limit: parseInt(limit) || 5,
    });

    return res.status(200).json({
      message: 'Get popular courses successfully',
      courses,
    });
  } catch (error) {
    console.error('Error getting all courses:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}
/**
 * @openapi
 * /api/courses/get-by-id:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get course by ID
 *     description: Get course by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     price:
 *                       type: number
 *       404:
 *         description: Course not found
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
    const course = await Course.findByPk(id);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    return res.status(200).json({
      message: `Get course by ID successfully`,
      course,
    });
  } catch (error) {
    console.error('Error getting course by ID:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}
/**
 * @openapi
 * /api/courses/get-by-category:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get course by ID
 *     description: Get course by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       price:
 *                         type: number
 *                       discount:
 *                         type: number
 *                       image:
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
async function getByIdCategory(req, res) {
  try {
    const { id } = req.params;
    const courses = await Course.findAll({
      where: { category_id: id },
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          as: "category",
        },
      ],
    });
    return res.status(200).json({
      message: `Get courses by category successfully`,
      courses,
    });
  } catch (error) {
    console.error('Error getting courses by category:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}
/**
 * @openapi
 * /api/courses/get-by-user:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get courses by user
 *     description: Get courses by user
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       price:
 *                         type: number
 *                       discount:
 *                         type: number
 *                       image:
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
async function getByIdUser(req, res) {
  try {
    const { user_id } = req.params;
    const enrollments = await Enrollment.findAll({
      where: { user_id },
      include: [Course],
    });
    const courses = enrollments.map((enrollment) => enrollment.Course);
    return res.status(200).json({
      message: `Get courses by user successfully`,
      courses,
    });
  } catch (error) {
    console.error('Error getting courses by user:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

/**
 * @openapi
 * /api/courses/suggested:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get suggested courses for a user
 *     description: Get personalized course suggestions based on user's interests and enrollment history
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: number
 *       - name: limit
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: Suggested courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       total_rating:
 *                         type: number
 *                       enrollment_count:
 *                         type: number
 *       500:
 *         description: Something went wrong
 */
async function getSuggestedCourses(req, res) {
  try {
    const { userId } = req.userData;
    const { limit } = req.query;
    console.log('Getting suggested courses for user:', userId);

    // First get top categories using Sequelize
    const topCategories = await Enrollment.findAll({
      where: { user_id: userId },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('course.category_id')), 'count'],
        [sequelize.col('course.category_id'), 'category_id'],
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM Courses WHERE Courses.category_id = course.category_id)`,
          ),
          'total_courses',
        ],
      ],
      include: [
        {
          model: Course,
          as: 'course',
          attributes: [],
        },
      ],
      group: [sequelize.col('course.category_id')],
      order: [
        [sequelize.fn('COUNT', sequelize.col('course.category_id')), 'DESC'],
      ],
      raw: true,
    });

    const categoryIds = topCategories
      .filter((cat) => cat.total_courses > cat.count)
      .slice(0, 2)
      .map((cat) => cat.category_id);

    const courses = await Course.findAll({
      where: {
        ...(categoryIds.length > 0
          ? {
              category_id: { [Sequelize.Op.in]: categoryIds },
            }
          : {}),
        id: {
          [Sequelize.Op.notIn]: sequelize.literal(`(
            SELECT course_id 
            FROM Enrollments 
            WHERE user_id = ${userId}
          )`),
        },
      },
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'total_rating',
        'image',
      ],
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          as: 'category',
        },
      ],
      order: [['total_rating', 'DESC']],
      limit: limit ? parseInt(limit) : 5,
    });

    return res.status(200).json({
      message: 'Get suggested courses successfully',
      courses,
    });
  } catch (error) {
    console.error('Error getting suggested courses:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
      stack: error.stack,
    });
  }
}

/**
 * @openapi
 * /api/courses/create:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a new course
 *     description: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: number
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       category_id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       price:
 *                         type: number
 *                       discount:
 *                         type: number
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
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
      category_id,
      name,
      description,
      status,
      total_rating,
      image,
      price,
      discount,
    } =
      req.body;

    if (!category_id || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const course = await Course.create({
      category_id,
      name,
      description,
      status,
      total_rating,
      image,
      price,
      discount,
    });

    return res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

/**
 * @openapi
 * /api/courses/update:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update a course
 *     description: Update a course
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: number
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       category_id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       price:
 *                         type: number
 *                       discount:
 *                         type: number
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
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
    const { id } = req.params;
    const {
      category_id,
      name,
      description,
      status,
      total_rating,
      image,
      price,
      discount,
    } =
      req.body;

    if (!category_id || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.update({
      category_id,
      name,
      description,
      status,
      total_rating,
      image,
      price,
      discount,
    });

    return res.status(200).json({
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}
/**
 * @openapi
 * /api/courses/delete:
 *   delete:
 *     tags:
 *       - Courses
 *     summary: Delete a course
 *     description: Delete a course
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Course not found
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

async function getCourseByReferenceCategoryId(req, res) {
  // category_id or NaN
  try {
    const category_id = parseInt(req.params.category_id);
    console.log(category_id);
    if (!category_id) {
      const course = await Course.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            as: "category",
          },
        ],
      });
      if (!course) return res.status(404).json({ message: "Course not found" });

      return res.status(200).json({
        message: `Get course by reference ID successfully`,
        course,
      });
    } else {
      const course = await Course.findAll({
        where: {
          category_id: category_id,
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            as: "category",
          },
        ],
      });
      if (!course) return res.status(404).json({ message: "Course not found" });

      return res.status(200).json({
        message: `Get course by reference ID successfully`,
        course,
      });
    }
  } catch (error) {
    console.error("Error getting course by reference ID:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.destroy();

    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

async function getCourseById_withCountEnrollment(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("enrollments.id")),
            "enrollment_count",
          ],
        ],

      },
      include: [
        {
          model: Enrollment,
          attributes: [],
          as: "enrollments",
        },
        {
          model: Category,
          attributes: ["id", "name"],
          as: "category",
        },
      ],

      group: ["Course.id"],
    });

    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json({
      message: `Get course by ID successfully`,
      course,
    });
  } catch (error) {
    console.error("Error getting course by ID:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = {
  index,
  getAll,
  getById,
  getByIdCategory,
  getByIdUser,
  create,
  update,
  remove,
  getCourseByReferenceCategoryId,
  getCourseById_withCountEnrollment,
getSuggestedCourses,
getPopularCourses,
};
