const CAST_ERR = 404;
const VALIDATION_ERR = 400;
const BASE_ERR = 500;

module.exports.notFoundErr = {
  name: "CastError"
}

module.exports.handleErorr = (err, res) => {
  //res.send(err);
  if (err.name === "CastError") {
    if (err.kind === "ObjectId" && err.value.lenght != 24) {
      console.log("kind is objecyId");
      return res.status(VALIDATION_ERR).send({ message: "Переданы некорректные данные"});
    }
    return res.status(CAST_ERR).send({ message: "Не найдено"});
  } else if (err.name === "ValidationError") {
    return res.status(VALIDATION_ERR).send({ message: "Переданы некорректные данные"});
  } else {
    return res.status(BASE_ERR).send({ message: "Произошла ошибка на стороне сервера"});
  }
}

