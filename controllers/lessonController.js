const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");
const Lesson = models.Lesson;
const v = new Validator();
const schema = {
  section_id: { type: "number", required: true },
  title: { type: "string", required: true, max: 100 },
  content: { type: "string", required: true, max: 255 },
  is_quizz: { type: "boolean", required: true },
  video_url: { type: "string", optional: true, max: 255 },
};

function index(req, res) {
  const lesson = "bài học";
  res.send("Hello " + lesson);
}
/**
 * @openapi
 * /api/lesson/get-all:
 *  get:
 *     tags:
 *     - Lesson Controller  
 *     description: Get all lessons
 *     responses:
 *       200:
 *         description: Get all lessons successfully
 *         content:
 *           application/json:  
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lessons: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number 
 *                       section_id:
 *                         type: number
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string 
 *                       is_quizz:
 *                         type: boolean
 *                       video_url:
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
    const lessons = await Lesson.findAll();
    return res
      .status(200)
      .json({ message: "Get all lessons successfully", lessons });
  } catch (error) {
    console.error("Error getting lessons:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/lesson/get-by-section-id:
 *  get:
 *     tags:
 *     - Lesson Controller
 *     description: Get lessons by section ID 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Get lessons by section successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lessons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       section_id:
 *                         type: number
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       is_quizz:
 *                         type: boolean
 *                       video_url:
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
async function getByIdSection(req, res) {
  try {
    const { id } = req.params;
    const lessons = await Lesson.findAll({ where: { section_id: id } });

    return res
      .status(200)
      .json({ message: "Get lessons by section successfully", lessons });
  } catch (error) {
    console.error("Error getting lessons by section:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/lesson/create:
 *  post:
 *     tags:
 *     - Lesson Controller
 *     description: Create a new lesson 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               section_id:
 *                 type: number
 *               title:
 *                 type: string
 *               content: 
 *                 type: string
 *               is_quizz:
 *                 type: boolean
 *               video_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lesson:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     section_id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     is_quizz:
 *                       type: boolean
 *                     video_url:
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
    const { section_id, title, content, is_quizz, video_url } = req.body;

    const validate = v.validate(
      { section_id, title, content, is_quizz, video_url },
      schema
    );
    if (validate !== true)
      return res
        .status(400)
        .json({ message: "Validation failed", error: validate });

    const lesson = await Lesson.create({
      section_id,
      title,
      content,
      is_quizz,
      video_url,
    });

    return res
      .status(201)
      .json({ message: "Lesson created successfully", lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/lesson/update:
 *  put:
 *     tags:
 *     - Lesson Controller
 *     description: Update a lesson   
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lesson:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     section_id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     is_quizz:
 *                       type: boolean
 *                     video_url:
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
    const { section_id, title, content, is_quizz, video_url } = req.body;

    const validate = v.validate(
      { section_id, title, content, is_quizz, video_url },
      schema
    );
    if (validate !== true)
      return res
        .status(400)
        .json({ message: "Validation failed", error: validate });

    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    lesson.section_id = section_id;
    lesson.title = title;
    lesson.content = content;
    lesson.is_quizz = is_quizz;
    lesson.video_url = video_url;
    await lesson.save();

    return res
      .status(200)
      .json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/lesson/delete:
 *  delete:
 *     tags:
 *     - Lesson Controller
 *     description: Delete a lesson     
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Lesson not found
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

    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    await lesson.destroy();

    return res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

module.exports = {
  index,
  getAll,
  getByIdSection,
  create,
  update,
  remove,
};
