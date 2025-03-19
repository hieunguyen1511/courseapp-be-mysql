const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");

const Enrollment = models.Enrollment;
const v = new Validator();

const schema = {
  course_id: { type: "number", integer: true, required: true },
  user_id: { type: "number", integer: true, required: true },
  complete_lesson: { type: "number", integer: true, default: 0 },
  rating: { type: "number", optional: true, default: null },
  review: { type: "string", optional: true, default: null },
};

function index(req, res) {
  const enrollment = "Enrollment";
  res.send("Hello " + enrollment);
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.status(200).json(enrollment);
  } catch (error) {
    console.error("Error getting enrollment by ID:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function getByCourse(req, res) {
  try {
    const { course_id } = req.params;
    const enrollments = await Enrollment.findAll({
      where: { course_id: course_id },
    });

    return res
      .status(200)
      .json({ message: "Get enrollments by course successfully", enrollments });
  } catch (error) {
    console.error("Get enrollments by course error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function getByUser(req, res) {
  try {
    const { user_id } = req.params;
    const enrollments = await Enrollment.findAll({
      where: { user_id: user_id },
    });

    return res
      .status(200)
      .json({ message: "Get enrollments by user successfully", enrollments });
  } catch (error) {
    console.error("Get enrollments by user error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function create(req, res) {
  try {
    const validationResponse = v.validate(req.body, schema);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    const {
      course_id,
      user_id,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    } = req.body;

    const enrollment = await Enrollment.create({
      course_id,
      user_id,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    });
    return res
      .status(201)
      .json({ message: "Create enrollment successfully", enrollment });
  } catch (error) {
    console.error("Create enrollment error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function update(req, res) {
  try {
    const validationResponse = v.validate(req.body, schema);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }
    const { id } = req.params;
    const {
      course_id,
      user_id,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await enrollment.update({
      course_id,
      user_id,
      total_lesson,
      complete_lesson,
      price,
      rating,
      review,
    });

    return res
      .status(200)
      .json({ message: "Update enrollment successfully", enrollment });
  } catch (error) {
    console.error("Update enrollment error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await enrollment.destroy();
    return res.status(200).json({ message: "Delete enrollment successfully" });
  } catch (error) {
    console.error("Delete enrollment error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
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
