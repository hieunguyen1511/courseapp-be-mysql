const Validator = require('fastest-validator');
const { resource } = require('../app');
const { Section, Lesson, Question, Answer } = require('../models');
const v = new Validator();

function index(req, res) {
  const section = 'phần';
  res.send('Hello ' + section);
}
/**
 * @openapi
 * /api/section/get-all:
 *  get:
 *     tags:
 *     - Section Controller
 *     description: Get all sections
 *     responses:
 *       200:
 *         description: Get all sections successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 sections:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       course_id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
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
async function getAll(req, res) {
  try {
    const sections = await Section.findAll();
    return res
      .status(200)
      .json({ message: 'Get all sections successfully', sections });
  } catch (error) {
    console.error('Get sections error:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

/**
 * @openapi
 * /api/section/get-by-course-id:
 *  get:
 *     tags:
 *     - Section Controller
 *     description: Get sections by course ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Get sections by course ID successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 sections:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       course_id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
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
async function getByIdCourse(req, res) {
  try {
    const { id } = req.params;

    // Tìm tất cả Sections thuộc Course
    const sections = await Section.findAll({
      where: { course_id: id },
      include: [
        {
          model: Lesson, // Include tất cả Lesson liên quan
          as: "lessons", // Alias cho quan hệ (nếu có đặt trong model)
          include: [
            {
              model: Question,
              as: "questions",
              include: [
                {
                  model: Answer,
                  as: "answers",
                },
              ],
            },
          ],
        },
      ],
    });

    return res
      .status(200)
      .json({
      message: 'Get sections and lessons by course successfully',
      sections
    });
  } catch (error) {
    console.error('Get sections by course error:', error);
    return res
      .status(500)
      .json({
      message: 'Something went wrong',
      error: error.message
    });
  }
}
/**
 * @openapi
 * /api/section/create:
 *  post:
 *     tags:
 *     - Section Controller
 *     description: Create a new section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: number
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 section:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     course_id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     description:
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
    const { course_id, name, description } = req.body;

    const schema = {
      course_id: { type: 'number', required: true },
      name: { type: 'string', required: true, max: 100 },
      description: { type: 'string', optional: true, max: 255 },
    };
    const validate = v.validate({ course_id, name, description }, schema);
    if (validate !== true)
      return res
        .status(400)
        .json({ message: 'Validation failed', error: validate });

    const section = await Section.create({ course_id, name, description });

    return res
      .status(201)
      .json({ message: 'Section created successfully', section });
  } catch (error) {
    console.error('Error creating section:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/section/update:
 *  put:
 *     tags:
 *     - Section Controller
 *     description: Update a section
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 section:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     course_id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     description:
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
    const { id } = req.params;
    const { course_id, name, description } = req.body;

    const schema = {
      course_id: { type: 'number', required: true },
      name: { type: 'string', required: true, max: 100 },
      description: { type: 'string', optional: true, max: 255 },
    };
    const validate = v.validate({ course_id, name, description }, schema);
    if (validate !== true)
      return res
        .status(400)
        .json({ message: 'Validation failed', error: validate });

    const section = await Section.findByPk(id);
    if (!section) return res.status(404).json({ message: 'Section not found' });

    section.course_id = course_id;
    section.name = name;
    section.description = description;
    await section.save();

    return res
      .status(200)
      .json({ message: 'Section updated successfully', section });
  } catch (error) {
    console.error('Error updated section:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/section/delete:
 *  delete:
 *     tags:
 *     - Section Controller
 *     description: Delete a section
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Section not found
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

    const section = await Section.findByPk(id);
    if (!section) return res.status(404).json({ message: 'Section not found' });

    await section.destroy();

    return res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleted error:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

async function getByCourseId_withLesson(req, res) {
  try {
    const { course_id } = req.params;
    const sections = await Section.findAll({
      where: { course_id: course_id },
      include: [
        {
          model: Lesson,
          as: "lessons",
          attributes: ["id", "section_id", "title", "content", "createdAt", "updatedAt"],
        },
      ],
    });

    return res.status(200).json({ message: "Get sections by course successfully", sections });
  } catch (error) {
    console.error("Get sections by course error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}


module.exports = { 
    index,
    getAll, 
    getByIdCourse,
    create, 
    update, 
    remove,
    getByCourseId_withLesson
};
