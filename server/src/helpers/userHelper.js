const { decodeToken } = require("../../helpers/jwtHelper");
const User = require("../user/user.model");

const isAuthor = async (req, res, next) => {
  // Vérifier si l'utilisateur est un auteur ou admin
  try {
    const { user } = decodeToken(req.cookies.jwt);
    const author = await User.findById(user.id);
    if (author.role === 'admin' || author.role === 'author'){
      next();
    } else {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

const checkAuthor = async (req, res, next) => {
  // Vérifier si l'utilisateur est l'auteur de la recette ou un admin
  try {
    await isAuthor(req, res, next);
    const { id } = req.params;
    const { user } = decodeToken(req.cookies.jwt);
    const recipe = await Recipe.findById(id) || req.body;
    if (recipe.author.toString() !== user.id) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

// Retourne le rôle de l'utilisateur ayant fait la requête
const checkRole = async (req,res,next) => {
  // Si l'utilisateur AYANT FAIT LA REQUËTE n'est pas un admin, il n'aura pas droit à certains accès
  try {
    const decodedToken = decodeToken(req.cookies.jwt);
    const user = await User.findById(decodedToken.id);
    return user.role
  }
  catch (error) {
    next(error);
  }
}

module.exports = { checkAuthor, isAuthor, checkRole };