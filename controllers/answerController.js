const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Answer = models.Answer;

function index(req, res) {
  const answer = "Đáp án";
  res.send("Hello " + answer);
}

// Lấy tất cả danh mục
function getAllByQuestionId(req, res) {
    const { question_id } = req.params; // Lấy question_id từ params
  
    Answer.findAll({
      where: { question_id: question_id }, // Tìm theo khóa ngoại question_id
    })
      .then((answers) => {
        res.status(200).json({
          message: "Get all answers for question successfully",
          answers: answers,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something went wrong",
          error: error.message,
        });
      });
  }
  

// Lấy một danh mục theo ID
function getById(req, res) {
  const { id } = req.params;
  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    });
}

// Tạo danh mục mới
function create(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  Category.create({ name })
    .then((category) => {
      res.status(201).json({
        message: "Category created successfully",
        category: category,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    });
}

// Cập nhật danh mục
function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return category.update({ name });
    })
    .then((updatedCategory) => {
      res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    });
}

// Xóa danh mục
function remove(req, res) {
  const { id } = req.params;

  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return category.destroy();
    })
    .then(() => {
      res.status(200).json({ message: "Category deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    });
}

module.exports = { 
    index,
    getAll, 
    getById, 
    create, 
    update, 
    remove 
};
