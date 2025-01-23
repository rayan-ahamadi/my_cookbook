const jwt = require('jsonwebtoken');

// Générer un token
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expire dans 1 heure
}
