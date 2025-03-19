const Validator = require("fastest-validator");
const { resource } = require("../app");
const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = models.User;
const v = new Validator();

//const passwordHash = require('password-hash');
function Hash(password) {
  return passwordHash.generate(password);
}

function index(req, res) {
  const user = "hieunguyen";
  res.send("Hello " + user);
}

async function getAll(req, res) {
  try {
    const users = await User.findAll({ include: ["enrollments", "comments"] });
    return res.status(200).json({
      message: "Get all users successfully",
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function register(req, res) {
  try {
    const { username, password, fullname, birth, phone, email, avatar, role } = req.body;

    const schema = {
      username: { type: "string", required: true, max: 50 },
      password: { type: "string", required: true },
      fullname: { type: "string", required: true, max: 50 },
      birth: { type: "string", required: true },
      phone: { type: "string", required: true, max: 12 },
      email: { type: "string", required: true },
    };
    const validate = v.validate({ username, password, fullname, birth, phone, email }, schema);
    if (validate !== true) return res.status(400).json({ message: "Validation failed", error: validate });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      fullname,
      birth,
      phone,
      email,
      avatar,
      role,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "Invalid username or password" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign({ username: user.username, userId: user.id }, process.env.JWT_KEY, { expiresIn: "1h" });

    return res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { old_password, password, fullname, birth, phone, email, avatar } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (old_password && password) {
      const passwordMatch = await bcrypt.compare(old_password, user.password);
      if (!passwordMatch) return res.status(400).json({ message: "Old password is incorrect" });

      user.password = await bcrypt.hash(password, 10);
    }

    const schema = {
      fullname: { type: "string", required: true, max: 50 },
      birth: { type: "string", required: true },
      phone: { type: "string", required: true, max: 12 },
      email: { type: "string", required: true },
    };
    const validate = v.validate({ fullname, birth, phone, email }, schema);
    if (validate !== true) return res.status(400).json({ message: "Validation failed", error: validate });

    user.fullname = fullname;
    user.birth = birth;
    user.phone = phone;
    user.email = email;
    user.avatar = avatar;

    await user.save();

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

module.exports = {
  index,
  getAll,
  register,
  login,
  getById,
  update,
  remove,
};
