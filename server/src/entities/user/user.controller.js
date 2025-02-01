const { generateToken, generateRefreshToken ,decodeToken } = require("../../helpers/jwtHelper");
const { hashPassword, comparePasswords } = require("../../helpers/bcryptHelper");
const { checkRole } = require("../../helpers/userHelper");
const { deleteAvatar } = require("../../helpers/imageHelpers");
const User = require("./user.model");
const Recipe = require("../recipe/recipe.model");

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
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    res.cookie('jwt', token, {
       httpOnly: true, 
       sameSite: 'none', 
       secure: false });
    res.cookie('refreshToken', refreshToken, {
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
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    res.cookie('jwt', token, {
      httpOnly: true, 
      sameSite: 'none', 
      secure: false });
    res.cookie('refreshToken', refreshToken, {
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



const getUser = async (req,res,next) => {
  try {
    const user = await User.findById(req.params.id);
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
    // Supprimer et modifier l'image de l'utilisateur
    deleteAvatar(req.params.id);
    if(req.file){
      req.body.avatar = "avatar/" + req.file.filename;
    } else {
      req.body.avatar = 'avatar/default.jpg';
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
    // Supprimer l'image de l'utilisateur
    deleteAvatar(req.params.id);

    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({user});
  }
  catch (error) {
    next(error);
  }
}

const addToFavorites = async (req,res,next) => {
  try {
    const userId = decodeToken(req.cookies.jwt).id;
    const user = await User.findById(userId);
    const recipe = await Recipe.findById(req.params.recipeId);

    // Vérifier que la recette n'est pas dans la liste de favoris
    if (!user.favorites.includes(recipe._id)) {
      user.favorites.push(recipe._id);
      recipe.favorites += 1;
      await user.save();
      await recipe.save();
    } else {
      return res.status(400).send({ message: 'Recipe already in favorites' });
    }
    res.status(200).send({user});
  }
  catch (error) {
    next(error);
  }
}

const removeFromFavorites = async (req,res,next) => {
  try {
    const userId = decodeToken(req.cookies.jwt).id;
    const user = await User.findById(userId);
    const recipe = await Recipe.findById(req.params.recipeId);

    // Vérifier que la recette est dans sa liste de favoris
    if (user.favorites.includes(recipe._id)) {
      user.favorites = user.favorites.filter(fav => fav.toString() !== recipe._id.toString());
      recipe.favorites -= 1;
      await user.save();
      await recipe.save();
    } else {
      return res.status(400).send({ message: 'Recipe already in favorites' });
    }
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
  deleteUser,
  addToFavorites,
  removeFromFavorites,
};