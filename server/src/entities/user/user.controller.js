const { generateToken, decodeToken } = require("../../helpers/jwtHelper");
const { hashPassword, comparePasswords } = require("../../helpers/bcryptHelper");
const User = require("./user.model");

// Pour les routes non protégées

const register = async (req,res,next) => {
  try {
    const user = new User(req.body);

    // Vérification de l'unicité de l'email
    const { email } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    user.password = await hashPassword(user.password); // Hash du mot de passe
    await user.save();

    // Envoie du token en cookie
    const token = generateToken({ id: user._id, role: user.role });
    res.cookie('jwt', token, {
       httpOnly: true, 
       sameSite: 'none', 
       secure: false });

    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req,res,next) => {
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

    // Envoie du token en cookie
    const token = generateToken({ id: user._id, role: user.role });
    res.cookie('jwt', token, {
      httpOnly: true, 
      sameSite: 'none', 
      secure: false });

    res.status(200).send({ user, token });
  }
  catch (error) {
    next(error);
  }
}

// Pour les routes protégées

const checkRole = async (req,res,next) => {
  // Si l'utilisateur AYANT FAIT LA REQUËTE n'est pas un admin, il n'aura pas droit à certains accès
  try {
    const decodedToken = decodeToken(req.cookies.jwt);
    const user = await User.findById(decodedToken.id);
    return user.role
  }
  catch (error) {
    next(error);
  }
}

const getUser = async (req,res,next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).send({user});
  }
  catch (error) {
    next(error);
  }
}

const getAllUsers = async (req,res,next) => {
  try {
    const role = await checkRole(req,res,next);
    console.log(role);
    if (role !== 'admin') {
      res.status(403).send({ message: 'Forbidden' });
      return;
    }

    const users = await User.find();
    res.status(200).send({users});
  }
  catch (error) {
    next(error);
  }
}

const updateUser = async (req,res,next) => {
  try {
     /* L'utilisateur AYANT FAIT LA REQUËTE ne peut modifier que son propre profil,
     sauf si il est admin */
    const decodedToken = decodeToken(req.cookies.jwt);
    if (decodedToken.id !== req.params.id && decodedToken.role !== 'admin') {
      res.status(403).send({ message: 'Forbidden' });
      return;
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({user});
  }
  catch(error) {
    next(error);
  }
}

const deleteUser = async (req,res,next) => {
  try {
    /* L'utilisateur AYANT FAIT LA REQUËTE ne peut modifier que son propre profil,
    sauf si il est admin */
    const decodedToken = decodeToken(req.cookies.jwt);
    if (decodedToken.id !== req.params.id && decodedToken.role !== 'admin') {
      res.status(403).send({ message: 'Forbidden' });
      return;
    }
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({user});
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};