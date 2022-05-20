const { celebrate, Joi, CelebrateError } = require('celebrate');
const { validation } = require('validator');

const urlVal = (url) => {
  if (!validation.isURL(url)) {
    throw new CelebrateError('Введите корректную ссылку');
  }
  return url;
};

module.exports.updateAvatarVal = celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().custom(urlVal),
  }),
});

module.exports.updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
});

module.exports.createUserVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.newCardVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlVal),
  }),
});

module.exports.idVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});
