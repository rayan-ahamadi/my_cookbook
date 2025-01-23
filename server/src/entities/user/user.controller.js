const { generateToken } = require("../../helpers/jwtHelper");
const { hashPassword, comparePasswords } = require("../../helpers/bcryptHelper");
const User = require("./user.model");

export const register = async (req,res,next) => {
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
    const token = generateToken({ id: user._id });
    res.status(201).send(user, token);
  } catch (error) {
    next(error);
  }
};

export const login = async (req,res,next) => {
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

    const token = generateToken({ id: user._id });
    res.status(200).send({ user, token });
  }
  catch (error) {
    next(error);
  }
}