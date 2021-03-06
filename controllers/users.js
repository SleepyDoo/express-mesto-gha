const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundErr = require('../errors/notFoundErr');
const BadLoginErr = require('../errors/badLoginErr');
const ConflictErr = require('../errors/conflictErr');
const ValidationErr = require('../errors/validationErr');

let JWT_SECRET;

if (process.env.NODE_ENV !== 'production') {
  JWT_SECRET = 'secret';
} else {
  JWT_SECRET = process.env.JWT_SECRET;
}

const SALT_NUM = 10;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users === null) {
        throw new NotFoundErr('Пользователь не найден');
      } else {
        res.send({ data: users });
      }
    })
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  console.log(req.params);
  User.findById(req.params.userId)
    .then((user) => {
      if ((!user)) {
        throw new NotFoundErr('Пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_NUM)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErr('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        next(new ConflictErr('Почта уже занята'));
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if ((user === null)) {
        throw new NotFoundErr('Пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, { new: true })
    .then((user) => {
      if ((user === null)) {
        throw new NotFoundErr('Пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadLoginErr('Неверные пароль или почта');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadLoginErr('Неверные пароль или почта');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
          });
          res.send({ data: token });
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user._id)
    .then((user) => {
      console.log(user);
      if (!user) {
        throw new NotFoundErr('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};
