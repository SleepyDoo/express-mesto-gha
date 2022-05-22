const jwt = require('jsonwebtoken');
const BadLoginErr = require('../errors/notFoundErr');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    next(new BadLoginErr('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
