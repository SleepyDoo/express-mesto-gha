const CAST_ERR = 404;
const VALIDATION_ERR = 400;
const BASE_ERR = 500;
const BADLOGIN_ERR = 401;

module.exports.notFoundErr = {
  name: 'CastError',
};

module.exports.badLogin = {
  name: 'badLogin',
};

module.exports.handleErorr = (err, res) => {
  let stat = BASE_ERR;
  const mess = { message: 'Произошла ошибка на стороне сервера' };
  console.log(err);
  if (err.name === 'CastError') {
    if (err.kind === 'ObjectId' && err.value.lenght !== 24) {
      stat = VALIDATION_ERR;
      mess.message = 'Переданы некорректные данные2';
    } else {
      stat = CAST_ERR;
      mess.message = 'Не найдено';
    }
  } else if (err.name === 'ValidationError') {
    stat = VALIDATION_ERR;
    mess.message = 'Переданы некорректные данные';
  } else if (err.name === 'badLogin') {
    stat = BADLOGIN_ERR;
    mess.message = 'Неправильные почта или пароль';
  }
  if (err.code === 11000) {
    stat = 409;
    mess.message = 'Почта занята';
  }
  return res.status(stat).send(mess);
};
