const { resource } = require("../app");
const models = require("../models");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = models.User;

//const passwordHash = require('password-hash');
function Hash(password) {
  return passwordHash.generate(password);
}

function index(req, res) {
  const user = "hieunguyen";
  res.send("Hello " + user);
}

function getAll(req, res) {
  User.findAll()
    .then((users) => {
      res.status(200).json({
        message: "Get all users successfully",
        users: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function register(req, res) {
  bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash(req.body.password, salt, function (err, hash) {
      const user = {
        username: req.body.username,
        password: hash,
        fullname: req.body.fullname,
        birth: req.body.birth,
        phone: req.body.phone,
        email: req.body.email,
        avatar: req.body.avatar,
        role: req.body.role,
      };
      User.create(user)
        .then((result) => {
          res.status(201).json({
            message: "Created user successfully",
            user: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong",
            error: error,
          });
        });
    });
  });
}

function login(req, res) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({
          message: "Invalid username or password",
        });
      }
      bcryptjs.compare(
        req.body.password,
        user.password,
        function (err, result) {
          if (result) {
            const token = jwt.sign(
              {
                username: user.username,
                userId: user.id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Authentication successful",
              token: token,
            });
          }
          return res.status(404).json({
            message: "Invalid username or password",
          });
        }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

module.exports = {
  index,
  getAll,
  register,
  login,
};
