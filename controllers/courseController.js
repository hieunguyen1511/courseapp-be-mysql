const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");

const Course = models.Course;

function index(req, res) {
  const course = "khóa học";
  res.send("Hello " + course);
}

async function getAll(req, res) {
  try {
    const courses = await Course.findAll();
    return res.status(200).json({
      message: "Get all courses successfully",
      courses,
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json(course);
  } catch (error) {
    console.error("Get course by ID error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function getByIdCategory(req, res) {
  try {
    const { id } = req.params;
    const courses = await Course.findAll({ where: { category_id: id } });

    return res.status(200).json({
      message: "Get courses by category successfully",
      courses,
    });
  } catch (error) {
    console.error("Get courses by category error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}


async function create(req, res) {
  try {
    const { category_id, name, description, status, price, discount } = req.body;

    if (!category_id || !name || !status || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = await Course.create({ category_id, name, description, status, price, discount });

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { category_id, name, description, status, price, discount } = req.body;

    if (!category_id || !name || !status || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.update({ category_id, name, description, status, price, discount });

    return res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update course error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.destroy();

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = { 
    index,
    getAll, 
    getById, 
    getByIdCategory,
    create, 
    update, 
    remove 
};
