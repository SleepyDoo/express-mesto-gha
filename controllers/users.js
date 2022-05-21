const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleErorr, notFoundErr, badLogin } = require('../errors/errorHandler');

const SALT_NUM = 10;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users === null) {
        throw notFoundErr;
      } else {
        res.send({ data: users });
      }
    })
    .catch((err) => handleErorr(err, res));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if ((user === null)) {
        throw notFoundErr;
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => handleErorr(err, res));
};

module.exports.createUser = (req, res) => {
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
    .catch((err) => handleErorr(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if ((user === null)) {
        throw notFoundErr;
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => handleErorr(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, { new: true })
    .then((user) => {
      if ((user === null)) {
        throw notFoundErr;
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => handleErorr(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw badLogin;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw badLogin;
          }
          const token = jwt.sign({ _id: user._id }, 'secret', {
            expiresIn: '7d',
          });
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
          });
          res.send({ token });
        });
    })
    .catch((err) => {
      console.log(err);
      handleErorr(err, res);
    });
};

module.exports.getCurrentUser = (req, res) => {
  console.log(req.user);
  User.findById(req.user._id)
    .then((user) => {
      console.log(user);
      if (!user) {
        throw notFoundErr;
      }
      res.send({ user });
    })
    .catch((err) => {
      console.log(req);
      handleErorr(err, res);
    });
};
