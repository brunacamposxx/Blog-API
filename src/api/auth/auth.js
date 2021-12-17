const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
expiresIn: '7d',
algorithm: 'HS256',
};

const generateToken = (email) => {
  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  return token;
};

module.exports =  generateToken;