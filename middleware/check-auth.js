const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.grantType === 'access_token') {
      req.userData = decoded;
      next();
    } else {
      return res.status(401).json({
        message: 'Invalid or expired token',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
      error: error,
    });
  }
}

module.exports = {
  checkAuth,
};
