const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload, secret, expiresIn = '30d') => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
