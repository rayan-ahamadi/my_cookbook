const { MongoClient } = require('mongodb');
require('dotenv').config(); // Charger les variables d'environnement

const client = new MongoClient(process.env.DATABASE_URL);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connexion à MongoDB réussie');
    return client.db(process.env.DB_NAME); // Retourne l'objet DB connecté
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
