import multer from 'multer';
import path from 'path';

// Configure multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/'); // Save files in 'uploads' directory
  },
  filename: (req, file, callback) => {
    const image_name = Date.now()+'.'+ Math.round(Math.random() * 1E4+file.originalname)
    callback(null, image_name)
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
