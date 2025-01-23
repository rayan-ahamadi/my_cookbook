const bcrypt = require('bcrypt');
const saltRounds = 10; // Nombre de tours de salage (plus élevé = plus sécurisé mais plus lent)

async function hashPassword(plainPassword) {
  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("Mot de passe hashé :", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
  }
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (isMatch) {
      console.log('Les mots de passe correspondent');
      return true;
    } else {
      console.log('Les mots de passe ne correspondent pas');
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la comparaison des mots de passe :', error);
    return false;
  }
}

module.exports = { hashPassword, comparePasswords };