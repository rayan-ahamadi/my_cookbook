const Express = require('express');
const Router = Express.Router();

const { 
  getRecipes, 
  getRecipe, 
  getRecipesWithLimit,
  getRecipesPaginate,
  searchRecipes,
  getRecipesBySeason
 } = require('./recipe.controller');

 /**
 * @swagger
 * /recipe/:
 *   get:
 *     summary: Récupérer toutes les recettes
 *     tags: [Recipes (routes publiques)]
 *     responses:
 *       200:
 *         description: Liste de toutes les recettes
 */
Router.get('/', getRecipes);

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     summary: Récupérer une recette par ID
 *     tags: [Recipes (routes publiques)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recette
 *     responses:
 *       200:
 *         description: Détails de la recette
 */
Router.get('/:id', getRecipe);

/**
 * @swagger
 * /recipe/limit/{limit}:
 *   get:
 *     summary: Récupérer un nombre limité de recettes
 *     tags: [Recipes (routes publiques)]
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Nombre de recettes à récupérer
 *     responses:
 *       200:
 *         description: Liste des recettes limitées
 */
Router.get('/limit/:limit', getRecipesWithLimit);

/**
 * @swagger
 * /recipe/paginate/{page}:
 *   get:
 *     summary: Récupérer les recettes paginées
 *     tags: [Recipes (routes publiques)]
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numéro de la page
 *     responses:
 *       200:
 *         description: Liste des recettes paginées
 */
Router.get('/paginate/:page', getRecipesPaginate)

/**
 * @swagger
 * /recipe/search/{search}:
 *   get:
 *     summary: Rechercher des recettes par mot-clé
 *     tags: [Recipes (routes publiques)]
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Mot-clé de recherche
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *       404:
 *         description: Aucune recette trouvée
 */
Router.get('/search/:search', searchRecipes);

/**
 * @swagger
 * /recipe/season/{season}:
 *  get:
 *    summary: Récupérer les recettes par saison
 *    tags: [Recipes (routes publiques)]
 *    parameters:
 *      - in: path
 *      name: season
 *      required: true
 *      schema:
 *        type: string
 *        description: Nom de la saison
 *    responses:
 *      200:
 *        description: Liste des recettes par saison
 */
Router.get('/season/:season', getRecipesBySeason);

module.exports = Router;