const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { newCardVal, cardIdVal } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', newCardVal, createCard);
router.delete('/cards/:cardId', cardIdVal, deleteCard);
router.put('/cards/:cardId/likes', cardIdVal, likeCard);
router.delete('/cards/:cardId/likes', cardIdVal, dislikeCard);

module.exports = router;
