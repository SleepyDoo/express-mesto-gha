const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

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

// app.use((req, res, next) => {
//   req.user = {
//     _id: '627d1311e37408215c72d0d5',
//   };

//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  auth(req, res, next);
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res, next) => {
  res.status(404).send({ message: 'Не найдено' });
  next();
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log('http://localhost:3000');
});
