import cloudinary from '../configs/cloudinary.config.js'
import path from 'path'
import fs from 'fs'
import { UserModel } from '../models/user.model.js'; 


export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload the file using its path
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_photos',
      resource_type: 'image'
    }) ;

      //  fs.unlinkSync(req.file.path);
  await UserModel.findByIdAndUpdate(req.user._id,{profilePic:result.secure_url}); //updatin in db also
    res.json({ message: 'Profile photo updated', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
