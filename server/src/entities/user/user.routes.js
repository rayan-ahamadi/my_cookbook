const express = require('express');
const router = express.Router();
const { uploadImage, processImage } = require('../../middlewares/multerSharpConfig');


const { 
  register, 
  login 
} = require('./user.controller');


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth (routes publiques)]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: userAvatar
 *         type: file
 *         description: Avatar de l'utilisateur (optionnel)
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
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 *       409:
 *         description: L'utilisateur existe déjà
 */
router.post('/register', uploadImage.single("userAvatar"), processImage(200, "avatar"), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth (routes publiques)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Identifiants incorrects
 */
router.post('/login', login);


module.exports = router;