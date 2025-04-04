const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./src/configs/dbConfig');
const { refreshToken } = require('./src/helpers/jwtHelper');
const { verifyToken } = require('./src/middlewares/authMiddleware');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const setupSwagger = require('./src/configs/swaggerConfig');
const { set } = require('mongoose');


dotenv.config(); // Charger les variables d'environnement

const app = express();

// Configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
const port = process.env.SERVER_PORT || 5000;

// Connexion à MongoDB
connectToDatabase();

// Routes

// Swagger
setupSwagger(app);

// Pour le test
app.get('/', (req, res) => {
  res.send('API is running');
})
// Sans Authentification, exemple : inscription, connexion, visualiser les recettes sans comptes
app.use('/api/user', require('./src/entities/user/user.routes.js'));
app.use('/api/recipe', require('./src/entities/recipe/recipe.routes'));
app.use('/api/comment', require('./src/entities/comment/comment.routes'));
// Servir les images
app.use('/images', express.static('src/uploads/image'));


// Avec Authentification, exemple : ajouter une recette, modifier une recette, supprimer une recette
app.use('/api/protected/recipe', verifyToken, require('./src/entities/recipe/recipe.protected.routes'));
app.use('/api/protected/user', verifyToken, require('./src/entities/user/user.protected.routes.js'));
app.use('/api/protected/comment', verifyToken, require('./src/entities/comment/comment.protected.routes'));
// Rafraîchir le token
app.post('/api/refresh', refreshToken);

// Gestion des erreurs
app.use((req, res, next) => {
  const error = {
    status: 404,
    message : 'Not found',
  }
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log("ERROR", error);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});


app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})