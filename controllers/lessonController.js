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

async function getAll(req, res) {
  try {
    const lessons = await Lesson.findAll();
    return res
      .status(200)
      .json({ message: "Get all lessons successfully", lessons });
  } catch (error) {
    console.error("Get lessons error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function getByIdSection(req, res) {
  try {
    const { id } = req.params;
    const lessons = await Lesson.findAll({ where: { section_id: id } });

    return res
      .status(200)
      .json({ message: "Get lessons by course successfully", lessons });
  } catch (error) {
    console.error("Get lessons by course error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

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
    console.error("Create lesson error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

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
    console.error("Update lesson error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    await lesson.destroy();

    return res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error("Delete lesson error:", error);
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
