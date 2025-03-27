const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");
const Section = models.Section;
const v = new Validator();

function index(req, res) {
  const section = "phần";
  res.send("Hello " + section);
}

async function getAll(req, res) {
  try {
    const sections = await Section.findAll();
    return res.status(200).json({ message: "Get all sections successfully", sections });
  } catch (error) {
    console.error("Get sections error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function getByIdCourse(req, res) {
  try {
    const { id } = req.params;
    const sections = await Section.findAll({ where: { course_id: id } });

    return res.status(200).json({ message: "Get sections by course successfully", sections });
  } catch (error) {
    console.error("Get sections by course error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function create(req, res) {
  try {
    const { course_id, name, description } = req.body;

    const schema = {
      course_id: { type: "number", required: true },
      name: { type: "string", required: true, max: 100 },
      description: { type: "string", optional: true, max: 255 },
    };
    const validate = v.validate({ course_id, name, description }, schema);
    if (validate !== true) return res.status(400).json({ message: "Validation failed", error: validate });

    const section = await Section.create({ course_id, name, description });

    return res.status(201).json({ message: "Section created successfully", section });
  } catch (error) {
    console.error("Error creating section:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { course_id, name, description } = req.body;

    const schema = {
      course_id: { type: "number", required: true },
      name: { type: "string", required: true, max: 100 },
      description: { type: "string", optional: true, max: 255 },
    };
    const validate = v.validate({ course_id, name, description }, schema);
    if (validate !== true) return res.status(400).json({ message: "Validation failed", error: validate });

    const section = await Section.findByPk(id);
    if (!section) return res.status(404).json({ message: "Section not found" });

    section.course_id = course_id;
    section.name = name;
    section.description = description;
    await section.save();

    return res.status(200).json({ message: "Section updated successfully", section });
  } catch (error) {
    console.error("Error updated section:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const section = await Section.findByPk(id);
    if (!section) return res.status(404).json({ message: "Section not found" });

    await section.destroy();

    return res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleted error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}


module.exports = { 
    index,
    getAll, 
    getByIdCourse,
    create, 
    update, 
    remove 
};
