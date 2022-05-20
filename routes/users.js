const router = require('express').Router();
const {
  getUsers, getUsersById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUsersById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/me', getCurrentUser);

module.exports = router;
