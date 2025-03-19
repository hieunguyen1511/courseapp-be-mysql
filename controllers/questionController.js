const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");

function index(req, res) {
  const question = "câu hỏi";
  res.send("Hello " + question);
}

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
    console.error("Get questions by lession error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const question = await models.Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json(question);
  } catch (error) {
    console.error("Error getting question by ID:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function create(req, res) {
  try {
    const { lesson_id, content, note } = req.body;
    const question = await models.Question.create({
      lesson_id,
      content,
      note,
    });
    return res
      .status(201)
      .json({ message: "Create question successfully", question });
  } catch (error) {
    console.error("Error creating question:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { lesson_id, content, note } = req.body;

    const question = await models.Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.update({ lesson_id, content, note });

    return res
      .status(200)
      .json({ message: "Update question successfully", question });
  } catch (error) {
    console.error("Error updating question:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const question = await models.Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.destroy();

    return res.status(200).json({ message: "Delete question successfully" });
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
