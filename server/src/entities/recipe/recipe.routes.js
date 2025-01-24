const Express = require('express');
const Router = Express.Router();

const { 
  getRecipes, 
  getRecipe, 
 } = require('./recipe.controller');

Router.get('/', getRecipes);
Router.get('/:id', getRecipe);

module.exports = Router;