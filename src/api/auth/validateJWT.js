const jwt = require('jsonwebtoken');
const userService = require('../../services/userService');


const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(token, JWT_SECRET, jwtConfig);
    const user = await userService.getUserByEmail(decoded.email);
    if (!user) {
      return res.status(401)
        .json({ message: 'Expired or invalid token' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};