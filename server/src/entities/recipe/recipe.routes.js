const Express = require('express');
const Router = Express.Router();

const { 
  getRecipes, 
  getRecipe, 
  getRecipesWithLimit,
  getRecipesPaginate
 } = require('./recipe.controller');

Router.get('/', getRecipes);
Router.get('/:id', getRecipe);
Router.get(':limit', getRecipesWithLimit);
Router.get(':page', getRecipesPaginate)

module.exports = Router;