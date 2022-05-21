const Card = require('../models/card');
const { NotFoundErr } = require('../errors/notFoundErr');
const { ForbiddenErr } = require('../errors/forbiddenErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.cardId })
    .then((card) => {
      if ((!card)) {
        throw new NotFoundErr({ message: 'Карточка не найдена' });
      }
      if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenErr({ message: 'Вы можете удалять только свои карточки' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if ((card === null)) {
        throw new NotFoundErr({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if ((card === null)) {
        throw new NotFoundErr({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
