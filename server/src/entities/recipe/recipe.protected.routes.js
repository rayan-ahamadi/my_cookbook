const Express = require('express');
const router = Express.Router();
const { uploadImage, processImage } = require('../../middlewares/multerSharpConfig');

const { 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,
  getFavoriteRecipes,
  searchRecipes
 } = require('./recipe.controller');


/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Ajouter une nouvelle recette
 *     tags: [Recipes (routes protégées)]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: recipeImage
 *         type: file
 *         description: Image de la recette
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Pizza Margherita"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Tomate"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     unit:
 *                       type: string
 *                       example: "pièces"
 *                     notes:
 *                       type: string
 *                       example: "Utiliser des tomates fraîches"
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Préchauffer le four à 220°C", "Étaler la pâte à pizza"]
 *               season:
 *                 type: string
 *                 enum: ['printemps', 'été', 'automne', 'hiver']
 *                 example: "été"
 *               difficulty:
 *                 type: string
 *                 enum: ['facile', 'moyen', 'difficile']
 *                 example: "facile"
 *               duration:
 *                 type: number
 *                 example: 30
 *     responses:
 *       201:
 *         description: Recette ajoutée avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/', uploadImage.single("recipeImage"), processImage(800, "recipe"), addRecipe);

/**
 * @swagger
 *  /recipe/{id}:
 *   put:
 *     summary: Mettre à jour une recette
 *     tags: [Recipes (routes protégées)]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recette à mettre à jour
 *       - in: formData
 *         name: recipeImage
 *         type: file
 *         description: Nouvelle image de la recette (optionnel)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Pizza Margherita"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Tomate"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     unit:
 *                       type: string
 *                       example: "pièces"
 *                     notes:
 *                       type: string
 *                       example: "Utiliser des tomates fraîches"
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Préchauffer le four à 220°C", "Étaler la pâte à pizza"]
 *               season:
 *                 type: string
 *                 enum: ['printemps', 'été', 'automne', 'hiver']
 *                 example: "été"
 *               difficulty:
 *                 type: string
 *                 enum: ['facile', 'moyen', 'difficile']
 *                 example: "facile"
 *               duration:
 *                 type: number
 *                 example: 30
 *     responses:
 *       200:
 *         description: Recette mise à jour avec succès
 *       404:
 *         description: Recette non trouvée
 */
router.put('/:id', uploadImage.single("recipeImage"), processImage(800, "recipe"), updateRecipe);

/**
 * @swagger
 * /recipe/{id}:
 *   delete:
 *     summary: Supprimer une recette
 *     tags: [Recipes (routes protégées)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recette à supprimer
 *     responses:
 *       200:
 *         description: Recette supprimée avec succès
 *       404:
 *         description: Recette non trouvée
 */
router.delete('/:id', deleteRecipe);

/**
 * @swagger
 * /recipe/search/{search}:
 *   get:
 *     summary: Rechercher des recettes par mot-clé
 *     tags: [Recipes (routes protégées)]
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
router.get('/search/:search', searchRecipes);

/**
 * @swagger
 * /recipe/fav/{userId}:
 *   get:
 *     summary: Récupérer les recettes favorites d'un utilisateur
 *     tags: [Recipes (routes protégées)]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des recettes favorites de l'utilisateur
 *       404:
 *         description: Aucune recette favorite trouvée
 */
router.get("/fav/:userId", getFavoriteRecipes);


module.exports = router;