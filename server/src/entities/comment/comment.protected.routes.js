const Express = require('express');
const router = Express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments (routes protégées)
 *   description: Gestion des commentaires
 */


const {
  getAllComment, 
  postComment, 
  updateComment, 
  deleteComment 
} = require('./comment.controller');



/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupérer tous les commentaires
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Liste de tous les commentaires récupérée avec succès
 *       404:
 *         description: Aucun commentaire trouvé
 */
router.get('/', getAllComment);

/**
 * @swagger
 * /comments/recipe/{recipeId}:
 *   post:
 *     summary: Ajouter un commentaire à une recette
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recette à commenter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: "Cette recette est incroyable !"
 *     responses:
 *       201:
 *         description: Commentaire ajouté avec succès
 *       400:
 *         description: Erreur lors de l'ajout du commentaire
 */
router.post('/recipe/:recipeId', postComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Mettre à jour un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "J'ai modifié mon commentaire !"
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.put('/:id', updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.delete('/:id', deleteComment);


module.exports = router;