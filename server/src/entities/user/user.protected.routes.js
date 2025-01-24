const express = require('express');
const router = express.Router();

const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('./user.controller');

router.get('/:id', getUser);
router.get('/all', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;