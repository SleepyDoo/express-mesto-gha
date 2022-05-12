const CAST_ERR = 404;
const VALIDATION_ERR = 400;
const BASE_ERR = 500;

module.exports.notFoundErr = {
  name: 'CastError',
};

module.exports.handleErorr = (err, res) => {
  let stat = BASE_ERR;
  const mess = { message: 'Произошла ошибка на стороне сервера' };
  if (err.name === 'CastError') {
    if (err.kind === 'ObjectId' && err.value.lenght != 24) {
      stat = VALIDATION_ERR;
      mess.message = 'Переданы некорректные данные';
    } else {
      stat = CAST_ERR;
      mess.message = 'Не найдено';
    }
  } else if (err.name === 'ValidationError') {
    stat = VALIDATION_ERR;
    mess.message = 'Переданы некорректные данные';
  }
  return res.status(stat).send(mess);
};
