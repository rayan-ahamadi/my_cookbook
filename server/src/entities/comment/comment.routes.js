const Express = require('express');
const Router = Express.Router();

const {
  getComment, 
  getCommentByRecipe,
} = require('./comment.controller');

Router.get('/:id', getComment);
Router.get('/recipe/:recipeId', getCommentByRecipe);

module.exports = Router;