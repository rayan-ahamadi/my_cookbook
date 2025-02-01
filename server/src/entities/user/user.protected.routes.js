const express = require('express');
const router = express.Router();
const { uploadImage, processImage } = require('../../middlewares/multerSharpConfig');

const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
} = require('./user.controller');

router.get('/:id', getUser);
router.get('/all', getAllUsers);
router.put('/:id', uploadImage.single("userAvatar"), processImage(200,"avatar"), updateUser);
router.delete('/:id', deleteUser);
router.post('/fav/:recipeId', addToFavorites)
router.delete('/fav/:recipeId', removeFromFavorites)


module.exports = router;