const jwt = require('jsonwebtoken');

// Fonction pour générer un token
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Fonction pour les demandes de rafraîchissement de token venant du client
function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token required' });
  }

  try {
    const decoded = verifyToken(refreshToken);
    const newToken = generateToken({ id: decoded.id, role: decoded.role });
    const newRefreshToken = generateRefreshToken({ id: decoded.id, role: decoded.role });

    res.cookie('jwt', newToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true 
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true 
    });

    return res.json({ message: 'Token refreshed' });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token', error: error.message });
  }
}

// Fonction pour vérifier un token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Fonction pour décoder un token
function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = { generateToken,generateRefreshToken, refreshToken, verifyToken, decodeToken };
