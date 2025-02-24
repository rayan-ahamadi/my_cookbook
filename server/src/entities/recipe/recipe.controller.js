const Recipe = require("../recipe/recipe.model");
const User = require("../user/user.model")
const { checkAuthor } = require("../../helpers/userHelper");
const { deleteRecipeImage } = require("../../helpers/imageHelpers");
const { escapeRegex } = require("../../helpers/regexHelper");


// Pour les routes non protégées (Consultation des recettes sans compte)

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipesWithLimit = async (req,res,next) => {
  try {
    const { limit } = req.params;
    const recipes = await Recipe.find().limit(parseInt(limit));
    res.status(200).send({recipes});
  }
  catch (error) {
    next(error);
  }
}

const getRecipesPaginate = async (req,res,next) => {
  try {
    const { page } = req.params;
    const recipes = await Recipe.find().skip(parseInt(page) * 10).limit(10);
    res.status(200).send({recipes});
  }
  catch (error) {
    next(error);
  }
}



const searchRecipes = async (req,res,next) => {
  try {
    const search = escapeRegex(req.params.search);
    const recipes = await Recipe.find({
      $text: { $search: search }
    });
    res.status(200).send({ recipes });
  } catch (error) {
    next(error);
  }
}

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.status(200).send({recipe});
  } catch (error) {
    next(error);
  }
};

const getRecipesBySeason = async (req, res, next) => {
  try {
    const { season } = req.params;
    const escapedSeason = escapeRegex(season);
    const recipes = await Recipe.find({ season: escapedSeason });
    res.status(200).send({recipes});
  } catch (error) {
    next(error);
  }
}

// Pour les routes protégées (Ajout, modification, suppression des recettes)


const addRecipe = async (req, res, next) => {
  try {
    // l'admin peut ajout une recette pour n'importe qui mais un auteur ne peut ajouter une recette que pour lui
    await checkAuthor(req, res, next);
    const recipe = new Recipe(req.body);

    if(req.file){
      recipe.image = "recipe/" + req.file.filename;
    } else {
      recipe.image = 'recipe/default.jpg';
    }


    await recipe.save();
    res.status(201).send({recipe});
  } catch (error) {
    next(error);
  }
}

const updateRecipe = async (req, res, next) => {
  try {
    // l'admin peut modifier une recette pour n'importe qui mais un auteur ne peut modifier une recette que pour lui
    await checkAuthor(req, res, next);
    const { id } = req.params;
    // Supprimer et Modifier l'image de la recette
    deleteRecipeImage(id);
    if(req.file){
      req.body.image = "recipe/" + req.file.filename;
    } else {
      req.body.image = 'recipe/default.jpg';
    }
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({recipe});
  }
  catch (error) {
    next(error);
  }
}

const deleteRecipe = async (req, res, next) => {
  try {
    // l'admin peut supprimer une recette pour n'importe qui mais un auteur ne peut supprimer une recette que pour lui
    await checkAuthor(req, res, next);
    const { id } = req.params;
    // Supprimer l'image de la recette
    deleteRecipeImage(id);

    await Recipe.findByIdAndDelete(id);
    res.status(204).send({message: 'Recipe deleted'});
  } catch (error) {
    next(error);
  }
}

const getFavoriteRecipes = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId)
    const favoritesId = user.favorites

    const favorites = await Recipe.find({ _id: { $in: favoritesId } });
    res.status(200).send({ favorites });

    if (!favorites) {
      res.status(404).send({ message: "No favorite recipes found" });
    }

  }
  catch(error){
    next(error)
  }
}

module.exports = {
  getRecipes,
  getRecipe,
  getRecipesWithLimit,
  getRecipesPaginate,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getFavoriteRecipes,
  searchRecipes,
  getRecipesBySeason,
};