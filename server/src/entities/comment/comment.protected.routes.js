const Express = require('express');
const Router = Express.Router();

const {
  getAllComment, 
  postComment, 
  updateComment, 
  deleteComment 
} = require('./comment.controller');

Router.get('/', getAllComment);
Router.post('recipe/:recipeId', postComment);
Router.put('/:id', updateComment);
Router.delete('/:id', deleteComment);

module.exports = Router;