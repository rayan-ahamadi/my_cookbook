const Express = require('express');
const Router = Express.Router();

const { 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,
 } = require('./recipe.controller');

Router.post('/', addRecipe);
Router.put('/:id', updateRecipe);
Router.delete('/:id', deleteRecipe);

module.exports = Router;