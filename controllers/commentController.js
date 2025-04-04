const Validator = require('fastest-validator');
const { resource } = require('../app');
const models = require('../models');

const Comment = models.Comments;

const v = new Validator();

const schema = {
  user_id: { type: 'number', integer: true, required: true },
  course_id: { type: 'number', integer: true, required: true },
  content: { type: 'string', required: true, min: 1 },
};

function index(req, res) {
  const comment = 'Comment';
  res.send('Hello ' + comment);
}

/**
 * @openapi
 * /api/comments/get-by-id:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comment by ID
 *     description: Get comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the comment to get
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function getById(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res.status(200).json({
      message: `Get comment by ID successfully`,
      comment,
    });
  } catch (error) {
    console.error('Error getting comment by ID:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

/**
 * @openapi
 * /api/comments/get-by-course:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments by course ID
 *     description: Get comments by course ID
 *     parameters:
 *       - name: course_id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Comments found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       course_id:
 *                         type: number
 *                       content:
 *                         type: string
 *                       parent_id:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       404:
 *         description: Comments not found
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
async function getByCourse(req, res) {
  try {
    const { course_id } = req.params;
    const comments = await Comment.findAll({
      where: { course_id },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['id', 'username', 'fullname', 'avatar'],
        },
      ],
    });
    return res.status(200).json({
      message: `Get comments by course successfully`,
      comments,
    });
  } catch (error) {
    console.error('Error getting comments by course:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

/**
 * @openapi
 * /api/comments/get-by-user:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments by user ID
 *     description: Get comments by user ID
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Comments found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       user_id:
 *                         type: number
 *                       course_id:
 *                         type: number
 *                       content:
 *                         type: string
 *                       parent_id:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       404:
 *         description: Comments not found
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
async function getByUser(req, res) {
  try {
    const { user_id } = req.params;
    const comments = await Comment.findAll({ where: { user_id } });
    return res.status(200).json({
      message: `Get comments by user successfully`,
      comments,
    });
  } catch (error) {
    console.error('Error getting comments by user:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

/**
 * @openapi
 * /api/comments/create:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a new comment
 *     description: Create a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function create(req, res) {
  try {
    const { course_id, content, parent_id } = req.body;
    const user_id = req.userData.userId;
    const validate = v.validate({ user_id, course_id, content }, schema);
    if (validate !== true)
      return res
        .status(400)
        .json({ message: 'Validation failed', error: validate });
    const comment = await Comment.create({
      user_id,
      course_id,
      content,
      parent_id,
    });
    return res.status(201).json({
      message: `Comment created successfullly`,
      comment,
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

/**
 * @openapi
 * /api/comments/update/{id}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Update a comment
 *     description: Update a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function update(req, res) {
  try {
    const { id } = req.params;
    const { user_id, course_id, content, parent_id } = req.body;
    const validate = v.validate({ user_id, course_id, content }, schema);
    if (validate !== true)
      return res
        .status(400)
        .json({ message: 'Validation failed', error: validate });
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    await comment.update({ user_id, course_id, content, parent_id });
    return res.status(200).json({
      message: `Comment updated successfullly`,
      comment,
    });
  } catch (error) {
    console.error('Error updating comment:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}

/**
 * @openapi
 * /api/comments/remove/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment
 *     description: Delete a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function remove(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    await comment.destroy();
    return res.status(200).json({
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}


async function getByCourseId_withUser(req, res) {
  try {
    const { course_id } = req.params;
    const comments = await Comment.findAll({
      where: { course_id },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "fullname","username", "email", "avatar"],
        },
      ],
    });
    return res.status(200).json({
      message: `Get comments by course successfully`,
      comments,
    });
  } catch (error) {
    console.error("Error getting comments by course:", error);
    return res.status(500).json({
      message: "Something went wrong",
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
  getByCourseId_withUser,
};
