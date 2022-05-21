const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { loginVal, createUserVal } = require('./middlewares/validation');
const { errorHandler } = require('./errors/errorHandler');
const NotFoundErr = require('./errors/notFoundErr');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb', (err) => {
  if (err) {
    throw err;
  }
  console.log('connected to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', loginVal, login);
app.post('/signup', createUserVal, createUser);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundErr('Не найдено'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log('http://localhost:3000');
});
