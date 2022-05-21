const { celebrate, Joi } = require('celebrate');

const urlRegex = /https?[www.]?:\/\/([a-z0-9A-Z]{2,256})\.([a-zA-Z]{1,4})\/([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)/;

module.exports.updateAvatarVal = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
    link: Joi.string().required().pattern(urlRegex),
  }).unknown(true),
});

module.exports.updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});

module.exports.loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

module.exports.createUserVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().pattern(urlRegex),
  }).unknown(true),
});

module.exports.newCardVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegex),
  }).unknown(true),
});

module.exports.idVal = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
});

module.exports.cardIdVal = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
});
