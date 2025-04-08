const Validator = require('fastest-validator');
const { resource } = require('../app');
const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = models.User;
const UserToken = models.UserToken;
const v = new Validator();

//const passwordHash = require('password-hash');
function Hash(password) {
  return passwordHash.generate(password);
}

function index(req, res) {
  const user = 'hieunguyen';
  res.send('Hello ' + user);
}
/**
 * @openapi
 * /api/user/get-all:
 *  get:
 *     tags:
 *     - User Controller
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Get all users successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       username:
 *                         type: string
 *                       fullname:
 *                         type: string
 *                       email:
 *                         type: string
 *                       avatar:
 *                         type: string
 *                       role:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function getAll(req, res) {
  try {
    const users = await User.findAll({ include: ['enrollments', 'comments'] });
    return res.status(200).json({
      message: 'Get all users successfully',
      users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/user/register:
 *  post:
 *     tags:
 *     - User Controller
 *     description: Returns API operational status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               fullname:
 *                 type: string
 *               birth:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     username:
 *                       type: string
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

async function register(req, res) {
  try {
    const { username, password, fullname, birth, phone, email, avatar, role } =
      req.body;

    const schema = {
      username: { type: 'string', required: true, max: 50 },
      password: { type: 'string', required: true },
      fullname: { type: 'string', required: true, max: 50 },
      birth: { type: 'string', required: true },
      phone: { type: 'string', required: true, max: 12 },
      email: { type: 'string', required: true },
    };
    //check validate username or email
    const checkUser = await User.findOne({ where: { username } });
    if (checkUser)
      return res.status(400).json({ message: 'Username already exists' });
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail)
      return res.status(400).json({ message: 'Email already exists' });

    const validate = v.validate(
      { username, password, fullname, birth, phone, email },
      schema,
    );
    if (validate !== true)
      return res
        .status(400)
        .json({ message: 'Validation failed', error: validate });

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
    await UserToken.create({
      user_id: user.id,
      refresh_token: null,
    });

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Register error:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/user/login:
 *  post:
 *     tags:
 *     - User Controller
 *     description: Returns API operational status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     username:
 *                       type: string
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(404).json({ message: 'Invalid username or password' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid username or password' });

    const access_token = jwt.sign(
      {
        grantType: 'access_token',
        username: user.username,
        userId: user.id,
        role: user.role,
        fullname: user.fullname,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' },
    );
    const refresh_token = jwt.sign(
      {
        grantType: 'refresh_token',
      },
      process.env.JWT_KEY,
      { expiresIn: '7d' },
    );
    const userToken = await UserToken.findOne({
      where: { user_id: user.id },
    });
    if (!userToken) {
      await UserToken.create({
        user_id: user.id,
        refresh_token: refresh_token,
      });
    } else {
      await UserToken.update(
        { refresh_token: refresh_token },
        { where: { user_id: user.id } },
      );
    }

    return res.status(200).json({
      message: 'Authentication successful',
      user,
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/user/get-by-id:
 *  get:
 *     tags:
 *     - User Controller
 *     description: Returns user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Get user by ID successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     username:
 *                       type: string
 *                     fullname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function getById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res
      .status(200)
      .json({ message: 'Get user by ID successfully', user });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
/**
 * @openapi
 * /api/user/update:
 *  put:
 *     tags:
 *     - User Controller
 *     description: Returns API operational status
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     username:
 *                       type: string
 *                     fullname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
async function update(req, res) {
  try {
    const { id } = req.params;
    const { old_password, password, fullname, birth, phone, email, avatar } =
      req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (old_password && password) {
      const passwordMatch = await bcrypt.compare(old_password, user.password);
      if (!passwordMatch)
        return res.status(400).json({ message: 'Old password is incorrect' });

      user.password = await bcrypt.hash(password, 10);
    }

    const schema = {
      fullname: { type: 'string', required: true, max: 50 },
      birth: { type: 'string', required: true },
      phone: { type: 'string', required: true, max: 12 },
      email: { type: 'string', required: true },
    };
    const validate = v.validate({ fullname, birth, phone, email }, schema);
    if (validate !== true)
      return res
        .status(400)
        .json({ message: 'Validation failed', error: validate });

    user.fullname = fullname;
    user.birth = birth;
    user.phone = phone;
    user.email = email;
    user.avatar = avatar;

    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updated user:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}

async function refreshToken(req, res) {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token)
      return res.status(400).json({ message: 'Refresh token is required' });

    const userToken = await UserToken.findOne({
      where: { refresh_token: refresh_token },
    });
    if (!userToken)
      return res.status(404).json({ message: 'Refresh token not found' });

    const user = await User.findByPk(userToken.user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    jwt.verify(refresh_token, process.env.JWT_KEY, (error, decoded) => {
      if (error)
        return res
          .status(401)
          .json({ message: 'Invalid or expired refresh token' });
      const access_token = jwt.sign(
        {
          grantType: 'access_token',
          username: user.username,
          userId: user.id,
          role: user.role,
          fullname: user.fullname,
          email: user.email,
        },
        process.env.JWT_KEY,
        { expiresIn: '1h' },
      );
      return res
        .status(200)
        .json({ message: 'Refresh token successful', access_token });
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
}
async function logout(req, res) {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token)
      return res.status(400).json({ message: 'Refresh token is required' });

    const userToken = await UserToken.findOne({
      where: { refresh_token: refresh_token },
    });
    if (!userToken)
      return res.status(404).json({ message: 'Refresh token not found' });

    jwt.destroy(refresh_token, (error) => {
      if (error)
        return res
          .status(401)
          .json({ message: 'Invalid or expired refresh token' });
    });
    await UserToken.update(
      { refresh_token: null },
      { where: { user_id: userToken.user_id } },
    );
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
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
  refreshToken,
  logout,
};
