const {decodeToken} = require('../../helpers/jwtHelper');
const {checkRole} = require('../../helpers/userHelper');
const Comment = require('./comment.model');
const Recipe = require('../recipe/recipe.model');


const getAllComment = async (req, res,next) => {
  try {
    if (await checkRole(req,res,next) !== 'admin') {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const comments = await Comment.find();
    res.json({comments});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getComment = async (req, res,next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.json({comment});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentByRecipe = async (req, res,next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    const commentsId = recipe.comments;
    const comments = await Comment.find({ _id: { $in: commentsId } });
    res.status(201).json({comments});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const postComment =  async (req, res,next) => {
  try {
    // Créer le commentaire
    const user = decodeToken(req.cookies.jwt);
    const comment = new Comment({
      content: req.body.content,
      author: user.id,
    });
    await comment.save();
    // Ajouter le commentaire à la recette
    const recipe = await Recipe.findById(req.params.recipeId);
    recipe.comments.push(comment.id);
    await recipe.save();
    res.status(201).json({comment});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
const updateComment = async (req, res,next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json({comment});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res,next) => {
  try {
    await Recipe.updateMany({comments: req.params.id}, { $pull: { comments: req.params.id } });
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).json({message: 'Comment deleted'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getAllComment, 
  getComment, 
  postComment, 
  updateComment, 
  deleteComment,
  getCommentByRecipe
};