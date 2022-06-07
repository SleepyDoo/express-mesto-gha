const router = require('express').Router();
const {
  getUsers, getUsersById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const {
  updateAvatarVal, updateUserVal, idVal,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.patch('/users/me', updateUserVal, updateUser);
router.patch('/users/me/avatar', updateAvatarVal, updateAvatar);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', idVal, getUsersById);

module.exports = router;
