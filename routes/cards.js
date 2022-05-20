const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { newCardVal, idVal } = require('../errors/validation');

router.get('/cards', getCards);
router.post('/cards', newCardVal, createCard);
router.delete('/cards/:cardId', idVal, deleteCard);
router.put('/cards/:cardId/likes', idVal, likeCard);
router.delete('/cards/:cardId/likes', idVal, dislikeCard);

module.exports = router;
