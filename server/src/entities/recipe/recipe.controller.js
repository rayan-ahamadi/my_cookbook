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
    const totalRecipes = await Recipe.countDocuments();
    const totalPages = Math.ceil(totalRecipes / 10);
    res.status(200).send({
      recipes,
      currentPage: parseInt(page),
      totalPages
    });
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

const searchRecipesPaginate = async (req,res,next) => {
  try {
    const search = escapeRegex(req.params.search);
    const { page } = req.params;
    const recipes = await Recipe.find({
      $text: { $search: search }
    }).skip(parseInt(page) * 10).limit(10);
    const totalRecipes = await Recipe.countDocuments({
      $text: { $search: search }
    });
    const totalPages = Math.ceil(totalRecipes / 10);
    res.status(200).send({
      recipes,
      currentPage: parseInt(page),
      totalPages: totalPages - parseInt(page) - 1
    });
  } catch (error) {
    next(error);
  }
}

const getRecipe = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const recipe = await Recipe.findOne({ slug: slug });
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }
    res.status(200).send({ recipe });
  } catch (error) {
    next(error);
  }
};

// Pour les routes protégées (Ajout, modification, suppression des recettes)


const addRecipe = async (req, res, next) => {
  try {
    // l'admin peut ajout une recette pour n'importe qui mais un auteur ne peut ajouter une recette que pour lui
    await checkAuthor(req, res, next);
    const recipe = new Recipe(req.body);

    if(req.file){
      recipe.image = req.file.filename;
    } else {
      recipe.image = 'default.jpg';
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
    await deleteRecipeImage(id);
    if(req.file){
      req.body.image = req.file.filename;
    } else {
      req.body.image = 'default.jpg';
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
    // Supprimer l'image de la rece
    await deleteRecipeImage(id);

    await Recipe.findByIdAndDelete(id);
    res.status(204).send({message: 'Recipe deleted'});
  } catch (error) {
    next(error);
  }
}

const getFavoriteRecipes = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId)

    const favoritesId = user.favorites // liste d'id de recettes

    const { page } = req.params;
    const favorites = await Recipe.find({ _id: { $in: favoritesId } })
                    .skip(parseInt(page) * 10)
                    .limit(10);
    const totalFavorites = await Recipe.countDocuments({ _id: { $in: favoritesId } });
    const totalPages = Math.ceil(totalFavorites / 10);

    res.status(200).send({
      favorites,
      currentPage: parseInt(page),
      totalPages: totalPages - parseInt(page) - 1
    });

    if (!favorites) {
      res.status(404).send({ message: "No favorite recipes found" });
    }

  }
  catch(error){
    next(error)
  }
}

const getRecipesFromUser = async (req,res,next) => {
  try{
    const user = await User.findById(req.params.userId)

    const userRecipes = await Recipe.find({ author: user._id });
    res.status(200).send({ userRecipes });

    if (!userRecipes) {
      res.status(404).send({ message: "No recipes found" });
    }

  }
  catch(error){
    next(error)
  }
}

const getRecipesBySeason = async (req, res, next) => {
  try {
    const { season } = req.params;
    const recipes = await Recipe.find({ season: season });
    res.status(200).send({ recipes });
  } catch (error) {
    next(error);
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
  getRecipesFromUser,
  searchRecipesPaginate,
};