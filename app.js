const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.use((req, res, next) => {
  req.user = {
    _id: '626fcc1634c6d077d1104740',
  };

  next();
});

//&& (req.params.cardId || req.params.userId



app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

;

app.use((req, res, next) => {
  res.status(404).send({ message: "Не найдено" });
  next();
});

app.use((req, res, next) => {
  console.log("LOL");
  if ((req.params.userId != 24 || req.params.cardId != 24)) {
    res.status(400).send({ message: "Неверный ID" });
    next();
  }
})

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log('http://localhost:3000');
});
