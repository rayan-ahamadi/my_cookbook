// Helper permettant de vérifier la validité du token JWT avec la méthode verifyToken
const jwtHelper = require('../helpers/jwtHelper');

function verifyToken(req, res, next) {
  // Récupérer le token depuis les cookies
  const token = req.cookies.jwt;
  const refreshToken = req.cookies.refreshToken;

  // Récuperer le token depuis le header Authorization si le token n'est pas dans les cookies
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length); 
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    // Vérifie la validité du token
    const decoded = jwtHelper.verifyToken(token); 
    req.user = decoded;  // Ajoute les informations de l'utilisateur à la requête
    next();  
  } catch (error) {
    // Si le token est invalide, on vérifie le refreshToken depuis le middleware
    if(refreshToken){
      const decoded = jwtHelper.verifyToken(refreshToken);
      const newToken = jwtHelper.generateToken({ id: decoded.id, role: decoded.role });
      const newRefreshToken = jwtHelper.generateRefreshToken({ id: decoded.id, role: decoded.role });
      res.cookie('jwt', newToken, {
        httpOnly: true, 
        sameSite: 'none', 
        secure: false });
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true, 
        sameSite: 'none', 
        secure: false }); 
      return next();
    }

    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = {verifyToken};

