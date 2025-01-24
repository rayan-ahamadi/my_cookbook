const Express = require('express');
const Router = Express.Router();

const {
  getAllComment, 
  getComment, 
  postComment, 
  updateComment, 
  deleteComment 
} = require('./comment.controller');

Router.get('/', getAllComment);
Router.get('/:id', getComment);
Router.post('/:recipeId', postComment);
Router.put('/:id', updateComment);
Router.delete('/:id', deleteComment);