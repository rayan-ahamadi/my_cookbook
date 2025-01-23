const mongoose = require('mongoose');
require('dotenv').config(); // Charger les variables d'environnement

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log('Connexion à MongoDB réussie avec Mongoose');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB avec Mongoose :', error);
    process.exit(1);
  }
}
module.exports = connectToDatabase;
