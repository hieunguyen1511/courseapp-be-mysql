const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");
const { Sequelize } = require("sequelize");

const Category = models.Category;
const v = new Validator();

function index(req, res) {
  const category = "chủ đề";
  res.send("Hello " + category);
}

async function getAll(req, res) {
  try {
    const categories = await Category.findAll({
      attributes: [
        'id',
        'name',
        'description',
        [
          Sequelize.literal(`(
            SELECT COUNT(*) 
            FROM Courses 
            WHERE Courses.category_id = Category.id
          )`),
          'courseCount',
        ],
      ],
    });

    return res.status(200).json({
      message: "Get all categories successfully",
      categories,
    });
  } catch (error) {
    console.error("Error getting all categories:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}


async function getById(req, res) {
  try {
    const { id } = req.params;
    
    const category = await Category.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'description',
        [
          Sequelize.literal(`(
            SELECT COUNT(*) 
            FROM Courses 
            WHERE Courses.category_id = ${id}
          )`),
          'courseCount',
        ],
      ],
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error("Error getting category by ID:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function create(req, res) {
  try {
    const { name, description } = req.body;

    const schema = {
      name: { type: "string", min: 3, max: 50, required: true },
      description: { type: "string", max: 255, required: false },
    };
    const validate = v.validate({ name, description }, schema);
    if (validate !== true) return res.status(400).json({ message: "Validation failed", error: validate });

    const category = await Category.create({ name, description });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const schema = {
      name: { type: "string", min: 3, max: 50, required: true },
      description: { type: "string", max: 255, required: false },
    };
    const validate = v.validate({ name, description }, schema);
    if (validate !== true) return res.status(400).json({ message: "Validation failed", error: validate });
    
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.update({ name, description });

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
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
    create, 
    update, 
    remove 
};
