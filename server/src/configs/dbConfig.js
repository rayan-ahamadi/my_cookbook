const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
  const dbUrl = process.env.DB_URL;
  const dbName = process.env.DB_NAME || 'cookBook';

  if (!dbUrl) {
    console.error('❌ DB_URL n\'est pas défini dans le fichier .env.');
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUrl, {
      dbName: dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connecté à MongoDB Atlas - Base : ${dbName}`);
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
