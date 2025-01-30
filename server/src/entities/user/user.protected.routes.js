const express = require('express');
const router = express.Router();
const { uploadAvatar } = require('../../middlewares/multerConfig');

const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('./user.controller');

router.get('/:id', getUser);
router.get('/all', getAllUsers);
router.put('/:id', uploadAvatar.single("userAvatar") , updateUser);
router.delete('/:id', deleteUser);

module.exports = router;