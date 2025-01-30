const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const uploadAvatar = multer({
  limits: 8 * 1024 * 1024,
  storage: storage, // Stocke l'image en mémoire temporaire (buffer)
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpeg", "jpg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const uploadRecipeImage = multer({
  limits: 8 * 1024 * 1024,
  storage: storage, // Stocke l'image en mémoire temporaire (buffer)
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpeg", "jpg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const processAvatar = async (req, res, next) => {
  if (!req.file) return next();
  const filename = `${Date.now()}-${path.extname(req.file.originalname)}`;
  await sharp(req.file.buffer) // Récupère l'image stockée en mémoire via son buffer
    .resize(200, 200)
    .toFile(path.join(__dirname, '../../uploads/avatar/', filename));
  req.file.filename = filename;
  next();
};

const processRecipeImage = async (req, res, next) => {
  if (!req.file) return next();
  const filename = `${Date.now()}-${path.extname(req.file.originalname)}`;
  await sharp(req.file.buffer) // Récupère l'image stockée en mémoire via son buffer
    .resize(800, 800)
    .toFile(path.join(__dirname, '../../uploads/recipe/', filename));
  req.file.filename = filename;
  next();
};

module.exports = { uploadAvatar, uploadRecipeImage, processAvatar, processRecipeImage };
