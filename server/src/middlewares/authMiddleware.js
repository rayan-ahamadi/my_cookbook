// Vérifier un token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token depuis le header

  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajouter les données décodées à la requête
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Accès interdit : Token invalide' });
  }
}

module.exports = { generateToken, verifyToken };
