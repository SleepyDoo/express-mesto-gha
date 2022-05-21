const { celebrate, Joi } = require('celebrate');

module.exports.updateAvatarVal = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
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
    avatar: Joi.string(),
  }).unknown(true),
});

module.exports.newCardVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }).unknown(true),
});

module.exports.idVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }).unknown(true),
});
