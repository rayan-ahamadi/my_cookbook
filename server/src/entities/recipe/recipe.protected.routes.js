const Express = require('express');
const Router = Express.Router();
const { uploadRecipeImage } = require('../../middlewares/multerConfig');

const { 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,
 } = require('./recipe.controller');

Router.post('/', uploadRecipeImage.single("recipeImage") ,addRecipe);
Router.put('/:id', uploadRecipeImage.single("recipeImage") ,updateRecipe);
Router.delete('/:id', deleteRecipe);

module.exports = Router;