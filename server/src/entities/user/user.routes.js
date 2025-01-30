const express = require('express');
const router = express.Router();
const { uploadImage, processImage } = require('../../middlewares/multerSharpConfig');

const { 
  register, 
  login 
} = require('./user.controller');

router.post('/register', uploadImage.single("userAvatar"), processImage(200,"avatar") ,register);
router.post('/login', login);

module.exports = router;