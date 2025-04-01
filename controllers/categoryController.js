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

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get category by ID
 *     description: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to get
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
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

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   $ref: '#/components/schemas/Category'
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

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category
 *     description: Update a category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Category not found
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

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
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

    return res.status(200).json({
      message: `Get category by ID successfully`,
      category,
    });
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
    console.error("Error creating category:", error);
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
    console.error("Error updating category:", error);
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
    console.error("Error deleting category:", error);
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
