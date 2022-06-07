const { celebrate, Joi, CelebrateError } = require('celebrate');
const validation = require('validator');

// const urlRegex
// = /https?[www\.]?:\/\/([a-z0-9A-Z]{2,256})\.
// \([a-zA-Z]{1,4})\/([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)/;

const validateURL = (value) => {
  if (!validation.isURL(value, { require_protocol: true })) {
    throw new CelebrateError('Неправильный формат ссылки');
  }
  return value;
};

module.exports.updateAvatarVal = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

module.exports.updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
});

module.exports.newCardVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

module.exports.idVal = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

module.exports.cardIdVal = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});
