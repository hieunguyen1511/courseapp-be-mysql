const Validator = require('fastest-validator');
const { resource } = require('../app');
const models = require('../models');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Answer = models.Answer;

const schema = {
  question_id: { type: 'number', integer: true, required: true },
  content: { type: 'string', min: 1 },
  is_correct: { type: 'boolean' },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         question_id:
 *           type: integer
 *         content:
 *           type: string
 *         is_correct:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *     AnswerArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Answer'
 *     AnswerInput:
 *       type: object
 *       required:
 *         - question_id
 *         - content
 *       properties:
 *         question_id:
 *           type: integer
 *           description: ID of the question this answer belongs to
 *         content:
 *           type: string
 *           description: Content of the answer
 *         is_correct:
 *           type: boolean
 *           description: Whether this answer is correct
 *           default: false
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 */

function index(req, res) {
  const answer = 'Đáp án';
  res.send('Hello ' + answer);
}

/**
 * @openapi
 * /api/answers/get-by-question:
 *   get:
 *     tags:
 *       - Answers
 *     summary: Get answers by question
 *     description: Get answers by question
 *     parameters:
 *       - name: question_id
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Answers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 answers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       question_id:
 *                         type: number
 *                       content:
 *                         type: string
 *                       is_correct:
 *                         type: boolean
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
async function getByQuestion(req, res) {
  try {
    const { question_id } = req.params;
    const answers = await Answer.findAll({
      where: { question_id: question_id },
    });

    return res.status(200).json({
      message: 'Get answers by question successfully',
      answers,
    });
  } catch (error) {
    console.error('Error getting answers by question:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

/**
 * @openapi
 * /api/answers/get-by-id:
 *   get:
 *     tags:
 *       - Answers
 *     summary: Get answer by ID
 *     description: Get answer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the answer to get
 *     responses:
 *       200:
 *         description: Answer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 answer:
 *                   $ref: '#/components/schemas/Answer'
 *       404:
 *         description: Answer not found
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
    const answer = await Answer.findByPk(id);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    return res.status(200).json({
      message: `Get answer by ID successfully`,
      answer,
    });
  } catch (error) {
    console.error('Error getting answer by ID:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

/**
 * @openapi
 * /api/answers/create:
 *   post:
 *     tags:
 *       - Answers
 *     summary: Create a new answer
 *     description: Create a new answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerInput'
 *     responses:
 *       201:
 *         description: Answer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 answer:
 *                   $ref: '#/components/schemas/Answer'
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
        message: 'Validation failed',
        errors: validationResponse,
      });
    }

    const { question_id, content, is_correct } = req.body;

    const answer = await Answer.create({
      question_id,
      content,
      is_correct,
    });
    return res
      .status(201)
      .json({ message: 'Answer created successfully', answer });
  } catch (error) {
    console.error('Error creating answer:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

/**
 * @openapi
 * /api/answers/update:
 *   put:
 *     tags:
 *       - Answers
 *     summary: Update an answer
 *     description: Update an answer
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the answer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerInput'
 *     responses:
 *       200:
 *         description: Answer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 answer:
 *                   $ref: '#/components/schemas/Answer'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Answer not found
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
    const { question_id, content, is_correct } = req.body;

    const answer = await Answer.findByPk(id);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    answer.question_id = question_id;
    answer.content = content;
    answer.is_correct = is_correct;

    await answer.save();

    return res
      .status(200)
      .json({ message: 'Answer updated successfully', answer });
  } catch (error) {
    console.error('Error updating answer:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

/**
 * @openapi
 * /api/answers/remove:
 *   delete:
 *     tags:
 *       - Answers
 *     summary: Delete an answer
 *     description: Delete an answer
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the answer to delete
 *     responses:
 *       200:
 *         description: Answer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 answer:
 *                   $ref: '#/components/schemas/Answer'
 *       404:
 *         description: Answer not found
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
    const answer = await Answer.findByPk(id);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    await answer.destroy();

    return res
      .status(200)
      .json({ message: 'Remove answer successfully', answer });
  } catch (error) {
    console.error('Error removing answer:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

module.exports = {
  index,
  getByQuestion,
  getById,
  create,
  update,
  remove,
};
