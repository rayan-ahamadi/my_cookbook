const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./src/configs/dbConfig');
const { upload, processImage } = require('./src/configs/multerConfig');
const { verifyToken } = require('./src/middlewares/authMiddleware');

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(express.json());

// Connexion à MongoDB
connectToDatabase();

// Routes

// Pour le test
app.get('/', (req, res) => {
  res.send('API is running');
})
// Sans Authentification, exemple : inscription, connexion, visualiser les recettes sans comptes
app.use('/user', require('./src/entities/user/user.routes'));
app.use('/recipe', verifyToken, require('./src/entities/recipe/recipe.routes'));
// Avec Authentification, exemple : ajouter une recette, modifier une recette, supprimer une recette
app.use('/protected/recipe', verifyToken, require('./src/entities/recipe/recipe.protected.routes'));
app.use('/protected/user', verifyToken, require('./src/entities/user/user.protected.routes'));

// Guard routes
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