const Express = require('express');
const Router = Express.Router();
const { uploadImage, processImage } = require('../../middlewares/multerSharpConfig');

const { 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,
  getFavoriteRecipes,
  searchRecipes
 } = require('./recipe.controller');

Router.post('/', uploadImage.single("recipeImage"), processImage(800,"recipe") ,addRecipe);
Router.put('/:id', uploadImage.single("recipeImage"), processImage(800,"recipe") ,updateRecipe);
Router.delete('/:id', deleteRecipe);
Router.get('/search/:search', searchRecipes);
Router.get("/fav/:userId", getFavoriteRecipes)


module.exports = Router;