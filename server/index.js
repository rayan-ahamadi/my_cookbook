const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./src/configs/dbConfig');
const { upload, processImage } = require('./src/configs/multerConfig');
const { verifyToken } = require('./src/middlewares/authMiddleware');

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(express.json());

// Connexion à MongoDB
let db;
connectToDatabase().then(database => {
  db = database;
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
})
app.use('/user', require('./src/entities/user/user.routes'));
app.use('/recipe', verifyToken, require('./src/entities/recipe/recipe.routes'));

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