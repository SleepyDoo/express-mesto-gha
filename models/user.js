const mongoose = require('mongoose');
const validation = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return validation.isURL(v);
      },
      name: 'ValidationError',
    },
  },
  email: {
    unique: true,
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validation.isEmail(v);
      },
      name: 'ValidationError',
    },
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
