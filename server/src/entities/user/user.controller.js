const jwt = require('jsonwebtoken');
const { generateToken, generateRefreshToken ,decodeToken } = require("../../helpers/jwtHelper");
const { hashPassword, comparePasswords } = require("../../helpers/bcryptHelper");
const { checkRole } = require("../../helpers/userHelper");
const { deleteAvatar } = require("../../helpers/imageHelpers");
const User = require("./user.model");
const Recipe = require("../recipe/recipe.model");

// Middleware de protection des routes
const protectRoute = (req, res, next) => {
  const token = req.cookies.jwt;  // Cherche le token JWT dans les cookies
  
  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, veuillez vous connecter.' }); // Si pas de token, retour d'erreur
  }

  try {
    const decodedToken = jwt.verify(token, 'secretKey');  // Décoder le token avec la clé secrète
    req.user = decodedToken;  // Ajouter les informations de l'utilisateur dans la requête
    next();  // Passer à la route suivante
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });  // Si le token est invalide ou expiré
  }
};

// Fonction d'inscription
const register = async (req, res, next) => {
  try {
    if (req.body.role === 'admin') {
      const role = await checkRole(req, res, next);
      if (role !== 'admin') {
        res.status(403).send({ message: 'Forbidden' });
        return;
      }
    }

    const user = new User(req.body);
    const { email, username } = req.body;
    const existing = await User.findOne({ email, username });

    if (existing) {
      return res.status(400).send({ message: 'Email ou pseudo déjà existant' });
    }

    user.password = await hashPassword(user.password);
    await user.save();

    const token = generateToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'none', secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none', secure: false });
    
    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
};

// Fonction de login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).send({ message: 'Utilisateur non existant' });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: 'Mot de passe invalide' });
    }

    const token = generateToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'none', secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none', secure: false });

    res.status(200).send({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  protectRoute,  // N'oublie pas d'exporter la fonction protectRoute ici
  register,
  login,
};
