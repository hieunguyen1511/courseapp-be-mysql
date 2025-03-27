const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");

const Comment = models.Comments;

const v = new Validator();

const schema = {
  user_id: { type: "number", integer: true, required: true },
  course_id: { type: "number", integer: true, required: true },
  content: { type: "string", required: true, min: 1 },
};

function index(req, res) {
  const comment = "Comment";
  res.send("Hello " + comment);
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json({
      message: `Get comment by ID successfully`,
      comment,
    });
  } catch (error) {
    console.error("Error getting comment by ID:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function getByCourse(req, res) {
  try {
    const { course_id } = req.params;
    const comments = await Comment.findAll({ where: { course_id } });
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

async function getByUser(req, res) {
  try {
    const { user_id } = req.params;
    const comments = await Comment.findAll({ where: { user_id } });
    return res.status(200).json({
      message: `Get comments by user successfully`,
      comments,
    });
  } catch (error) {
    console.error("Error getting comments by user:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function create(req, res) {
  try {
    const { user_id, course_id, content, parent_id } = req.body;
    const validate = v.validate({ user_id, course_id, content }, schema);
    if (validate !== true)
      return res
        .status(400)
        .json({ message: "Validation failed", error: validate });
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
    console.error("Error creating comment:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { user_id, course_id, content, parent_id } = req.body;
    const validate = v.validate({ user_id, course_id, content }, schema);
    if (validate !== true)
      return res
        .status(400)
        .json({ message: "Validation failed", error: validate });
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    await comment.update({ user_id, course_id, content, parent_id });
    return res.status(200).json({
      message: `Comment updated successfullly`,
      comment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    await comment.destroy();
    return res.status(200).json({
      message: "Comment deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
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
};
