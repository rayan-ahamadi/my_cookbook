const Express = require('express');
const router = Express.Router();



const {
  getComment, 
  getCommentByRecipe,
} = require('./comment.controller');

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Récupérer un commentaire par son ID
 *     tags: [Comments (routes publiques)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire à récupérer
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.get('/:id', getComment);

/**
 * @swagger
 * /comment/recipe/{recipeId}:
 *   get:
 *     summary: Récupérer les commentaires d'une recette
 *     tags: [Comments (routes publiques)]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recette dont on veut récupérer les commentaires
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       404:
 *         description: Aucun commentaire trouvé pour cette recette
 */
router.get('/recipe/:recipeId', getCommentByRecipe);


module.exports = router;