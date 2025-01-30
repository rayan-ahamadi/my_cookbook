const multer = require('multer');
const path = require('path');

const uploadAvatar = multer({
  limits: 8 * 1024 * 1024,
  storage : multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads/avatar/'));
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpeg", "jpg", "png"];
    if(allowedFileType.includes(file.mimetype.split("/")[1])){
      cb(null,true)
    }else{
        cb(null,false)
    }
  }
});

const uploadRecipeImage = multer({
  limits: 10 * 1024 * 1024,
  storage : multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads/recipe/'));
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpeg", "jpg", "png"];
    if(allowedFileType.includes(file.mimetype.split("/")[1])){
      cb(null,true)
    }else{
        cb(null,false)
    }
  }
});

module.exports = { uploadAvatar, uploadRecipeImage };
