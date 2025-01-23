const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configuration du stockage temporaire avec Multer
const storage = multer.memoryStorage(); // Stockage en mémoire temporaire
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accepter les images
    } else {
      cb(new Error('Seules les images sont autorisées'), false); // Rejeter les autres fichiers
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5 Mo
});

// Middleware pour traiter et enregistrer une image redimensionnée
async function processImage(req, res, next) {
  if (!req.file) return next();

  try {
    const outputPath = path.join(__dirname, 'uploads', `resized-${Date.now()}.jpeg`);
    await sharp(req.file.buffer)
      .resize(300, 300) // Redimensionne à 300x300 pixels
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    req.file.processedPath = outputPath; // Stocke le chemin de l'image traitée
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { upload, processImage };
