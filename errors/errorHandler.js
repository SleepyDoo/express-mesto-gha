module.exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  if (!err.status) {
    res.status(500).send({ message: 'Произошла ошибка на стороне сервера' });
    next();
  }
  res.status(err.status).send({ message: err.message });
  next();
};
