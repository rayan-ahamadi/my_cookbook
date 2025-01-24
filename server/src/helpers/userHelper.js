const { decodeToken } = require("./jwtHelper");
const User = require("../entities/user/user.model");
const Recipe = require("../entities/recipe/recipe.model");


const checkAuthor = async (req, res, next) => {
  // Vérifier si l'utilisateur est l'auteur de la recette ou un admin
  try {
    const author = await checkRole(req,res,next);
    if (author === 'admin') {
      return true;
    }
    const { id } = req.params;
    const user = decodeToken(req.cookies.jwt);
    const recipe = await Recipe.findById(id) || req.body;
    if (recipe.author.toString() !== user.id) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }
    return true;
  } catch (error) {
     return res.status(error.status).send({ message: error.message });
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
    return res.status(401).send({ error });
  }
}

module.exports = { checkAuthor, checkRole };