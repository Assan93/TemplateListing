const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Invalid image file!', false);
  }
};

const uploads = multer({ storage, fileFilter });

module.exports = uploads;