// Helper permettant de vérifier la validité du token JWT avec la méthode verifyToken
const jwtHelper = require('../helpers/jwtHelper');

function verifyToken(req, res, next) {
  // Récupérer le token depuis les headers de la requête (Authorization)
  const token = req.cookies.jwt || req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    // Vérifie la validité du token
    const decoded = jwtHelper.verifyToken(token); 
    req.user = decoded;  // Ajoute les informations de l'utilisateur à la requête
    next();  
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken;

