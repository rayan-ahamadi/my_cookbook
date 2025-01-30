const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const uploadImage = multer({
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


const processImage = (size, folder) => async (req, res, next) => {
  if (!req.file) return next();
  
  const filename = `${Date.now()}${path.extname(req.file.originalname)}`;
  
  try {
    await sharp(req.file.buffer)  // Récupère l'image stockée en mémoire via son buffer
      .resize(size, size)
      .toFormat("webp")
      .webp({ quality: 80 })
      .toFile(path.join(__dirname, `../../uploads/${folder}/`, filename));
    
    req.file.filename = filename;
    next();
  } catch (error) {
    console.error("Erreur lors du traitement de l'image :", error);
    return res.status(500).json({ error: "Erreur lors du traitement de l'image" });
  }
};


module.exports = { uploadImage, processImage };
