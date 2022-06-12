require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { loginVal, createUserVal } = require('./middlewares/validation');
const { errorHandler } = require('./errors/errorHandler');
const NotFoundErr = require('./errors/notFoundErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb', (err) => {
  if (err) {
    throw err;
  }
  console.log('connected to MongoDB');
});

const corsOptions = {
  credentials: true,
  origin: ['https://sleepydoo.mesto.nomoredomains.xyz',
    'http://sleepydoo.mesto.nomoredomains.xyz',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
  method: ['GET, HEAD, PUT, PATCH, POST, DELETE'],
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginVal, login);
app.post('/signup', createUserVal, createUser);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundErr('Не найдено'));
}, auth);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log('http://localhost:3000');
});
