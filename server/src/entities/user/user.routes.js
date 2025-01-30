const express = require('express');
const router = express.Router();
const { uploadAvatar, processAvatar } = require('../../middlewares/multerSharpConfig');

const { 
  register, 
  login 
} = require('./user.controller');

router.post('/register', uploadAvatar.single("userAvatar"), processAvatar ,register);
router.post('/login', login);

module.exports = router;