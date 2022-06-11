const jwt = require('jsonwebtoken');
const BadLoginErr = require('../errors/badLoginErr');

module.exports.auth = (req, res, next) => {
  let token = null;
  if (req.headers.authorization) {
    console.log(req.headers);
    console.log(req.headers.authorization);
    token = req.headers.authorization.replace('Bearer ', '');
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    next(new BadLoginErr('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
