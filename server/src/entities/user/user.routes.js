const express = require('express');
const router = express.Router();
const { uploadAvatar } = require('../../middlewares/multerConfig');

const { 
  register, 
  login 
} = require('./user.controller');

router.post('/register', uploadAvatar.single("userAvatar")  ,register);
router.post('/login', login);

module.exports = router;