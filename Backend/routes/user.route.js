import express from 'express';

import { protectRoute } from '../middlewares/auth.middleware.js';

import {  register,login,sendResetEmail, newPassget,newPassPost,update_profile,profile_info } from '../controllers/user.controller.js';

const UserRouter = express.Router();

UserRouter.post('/register',register);
UserRouter.post('/login',login);
UserRouter.get('/profile_info',protectRoute,profile_info);
UserRouter.patch('/update_profile',protectRoute,update_profile);
UserRouter.post('/forgot_password',sendResetEmail);
UserRouter.get('/reset_password/:token',newPassget);
UserRouter.post('/reset_password/:token',newPassPost);


export default UserRouter