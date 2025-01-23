const express = require('express');
const router = express.Router();

const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('./user.controller');

router.get('/', getUser);
router.get('/all', getAllUsers);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;