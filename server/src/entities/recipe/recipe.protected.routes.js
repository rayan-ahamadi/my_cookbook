const Express = require('express');
const Router = Express.Router();
const { uploadRecipeImage, processRecipeImage } = require('../../middlewares/multerSharpConfig');

const { 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,
 } = require('./recipe.controller');

Router.post('/', uploadRecipeImage.single("recipeImage"), processRecipeImage ,addRecipe);
Router.put('/:id', uploadRecipeImage.single("recipeImage"), processRecipeImage ,updateRecipe);
Router.delete('/:id', deleteRecipe);

module.exports = Router;