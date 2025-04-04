const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");



const schema = {
  lesson_id: { type: "number", integer: true, required: true },
  content: { type: "string", min: 1 },
};


function index(req, res) {
  const question = "câu hỏi";
  res.send("Hello " + question);
}
/**
 * @openapi
 * /api/questions/get-by-lesson:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get questions by lesson
 *     description: Get questions by lesson
 *     parameters:
 *       - name: lesson_id
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
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
async function get_question_by_lesson(req, res) {
  try {
    const { lesson_id } = req.params;
    const questions = await models.Question.findAll({
      where: { lesson_id: lesson_id },
    });

    return res
      .status(200)
      .json({ message: "Get questions by lesson successfully", questions });
  } catch (error) {
    console.error("Error getting questions by lession:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/questions/get-by-id:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get question by ID
 *     description: Get question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the question to get
 *     responses:
 *       200:
 *         description: Question retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
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
    const question = await models.Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ 
      message: "Get question by ID successfully", 
      questions 
    });
  } catch (error) {
    console.error("Error getting question by ID:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/questions/create:
 *   post:
 *     tags:
 *       - Questions
 *     summary: Create a new question
 *     description: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 question:
 *                   $ref: '#/components/schemas/Question'
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
    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    const { lesson_id, content, note } = req.body;

    const question = await models.Question.create({
      lesson_id,
      content,
      note,
    });
    return res
      .status(201)
      .json({ message: "Question created successfully", question });
  } catch (error) {
    console.error("Error creating question:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/questions/update/{id}:
 *   put:
 *     tags:
 *       - Questions
 *     summary: Update a question
 *     description: Update a question
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Question not found
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

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    const { id } = req.params;
    const { lesson_id, content, note } = req.body;

    const question = await models.Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    

    await question.update({ lesson_id, content, note });

    return res
      .status(200)
      .json({ message: "Question updated successfully", question });
  } catch (error) {
    console.error("Error updating question:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
/**
 * @openapi
 * /api/questions/remove/{id}:
 *   delete:
 *     tags:
 *       - Questions
 *     summary: Delete a question
 *     description: Delete a question
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the question to delete
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
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
    const question = await models.Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.destroy();

    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

module.exports = {
    index,
    get_question_by_lesson,
    getById,
    create,
    update,
    remove,
};
