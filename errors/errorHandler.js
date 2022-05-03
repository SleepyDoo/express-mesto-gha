const CAST_ERR = 404;
const VALIDATION_ERR = 400;
const BASE_ERR = 500;

module.exports.notFoundErr = {
  name: "CastError"
}

module.exports.handleErorr = (err, res) => {
  console.log(err);
  if (err.name === "CastError") {
    return res.status(CAST_ERR).send({ message: "Не найдено"});
  } else if (err.name === "ValidationError") {
    return res.status(VALIDATION_ERR).send({ message: "Переданы некорректные данные"});
  } else {
    return res.status(BASE_ERR).send({ message: "Произошла ошибка на стороне сервера"});
  }
}