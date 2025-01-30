const Express = require('express');
const Router = Express.Router();
const { uploadImage, processImage } = require('../../middlewares/multerSharpConfig');

const { 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,
 } = require('./recipe.controller');

Router.post('/', uploadImage.single("recipeImage"), processImage(800,"recipe") ,addRecipe);
Router.put('/:id', uploadImage.single("recipeImage"), processImage(800,"recipe") ,updateRecipe);
Router.delete('/:id', deleteRecipe);

module.exports = Router;