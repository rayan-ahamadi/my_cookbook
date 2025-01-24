const Recipe = require("../recipe/recipe.model");
const { checkAuthor } = require("../../helpers/userHelper");

// Pour les routes non protégées (Consultation des recettes sans compte)

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.status(200).send(recipe);
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
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    next(error);
  }
}

const updateRecipe = async (req, res, next) => {
  try {
    // l'admin peut modifier une recette pour n'importe qui mais un auteur ne peut modifier une recette que pour lui
    await checkAuthor(req, res, next);
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(recipe);
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
    await Recipe.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};