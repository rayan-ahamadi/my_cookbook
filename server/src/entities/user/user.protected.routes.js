const express = require('express');
const router = express.Router();
const { uploadImage, processImage } = require('../../middlewares/multerSharpConfig');




const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
} = require('./user.controller');

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Récupérer les informations d'un utilisateur par ID
 *     tags: [Users (routes protégées)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', getUser);

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Récupérer la liste de tous les utilisateurs
 *     tags: [Users (routes protégées)]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       404:
 *         description: Aucun utilisateur trouvé
 */
router.get('/all', getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users (routes protégées)]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à mettre à jour
 *       - in: formData
 *         name: userAvatar
 *         type: file
 *         description: Nouvel avatar de l'utilisateur (optionnel)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John"
 *               surname:
 *                 type: string
 *                 example: "Doe"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *               role:
 *                 type: string
 *                 enum: ['user', 'author', 'admin']
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/:id', uploadImage.single("userAvatar"), processImage(200, "avatar"), updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users (routes protégées)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /user/fav/{recipeId}:
 *   post:
 *     summary: Ajouter une recette aux favoris de l'utilisateur connecté
 *     tags: [Users (routes protégées)]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recette à ajouter aux favoris
 *     responses:
 *       200:
 *         description: Recette ajoutée aux favoris avec succès
 *       400:
 *         description: Erreur lors de l'ajout aux favoris
 */
router.post('/fav/:recipeId', addToFavorites);

/**
 * @swagger
 * /user/fav/{recipeId}:
 *   delete:
 *     summary: Supprimer une recette des favoris de l'utilisateur connecté
 *     tags: [Users (routes protégées)]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la recette à supprimer des favoris
 *     responses:
 *       200:
 *         description: Recette retirée des favoris avec succès
 *       400:
 *         description: Erreur lors de la suppression des favoris
 */
router.delete('/fav/:recipeId', removeFromFavorites);



module.exports = router;