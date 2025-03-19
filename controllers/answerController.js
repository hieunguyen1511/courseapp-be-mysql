const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Answer = models.Answer;

const schema = {
  question_id: { type: "number", integer: true, required: true },
  content: { type: "string", min: 1 },
  is_correct: { type: "boolean" },
};

function index(req, res) {
  const answer = "Đáp án";
  res.send("Hello " + answer);
}

async function getByQuestion(req, res) {
  try {
    const { question_id } = req.params;
    const answers = await Answer.findAll({
      where: { question_id: question_id },
    });

    return res
      .status(200)
      .json({ message: "Get answers by question successfully", answers });
  } catch (error) {
    console.error("Get answers by question error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const answer = await Answer.findByPk(id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res.status(200).json(answer);
  } catch (error) {
    console.error("Error getting answer by ID:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

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

    const { question_id, content, is_correct } = req.body;

    const answer = await Answer.create({
      question_id,
      content,
      is_correct,
    });
    return res
      .status(201)
      .json({ message: "Create answer successfully", answer });
  } catch (error) {
    console.error("Error creating answer:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

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
    const { question_id, content, is_correct } = req.body;

    const answer = await Answer.findByPk(id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    answer.question_id = question_id;
    answer.content = content;
    answer.is_correct = is_correct;

    await answer.save();

    return res
      .status(200)
      .json({ message: "Update answer successfully", answer });
  } catch (error) {
    console.error("Error updating answer:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const answer = await Answer.findByPk(id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    await answer.destroy();

    return res
      .status(200)
      .json({ message: "Remove answer successfully", answer });
  } catch (error) {
    console.error("Error removing answer:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
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
