
import express from 'express';
import upload from '../middlewares/multer.middleware.js';
import { updateProfilePhoto } from '../controllers/profile_photo.Controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const avatar_upload_router = express.Router();

avatar_upload_router.post('/upload', upload.single('profilePhoto'),protectRoute, updateProfilePhoto);

export default avatar_upload_router;
