import { UserModel } from '../models/user.model.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import  nodemailer from 'nodemailer';
import dotnv from 'dotenv';
dotnv.config()

import path from 'path';
import { fileURLToPath } from "url";

import { createOtp } from './otp.controller.js';


const generateToken = (user) => jwt.sign({_id:user._id, email: user.email }, process.env.JWT_SECRET);


//signup
const register = async (req, res) => {
    try {

    const { name, email,  password, profilePic,gender,height,weight,tags} = req.body;
        const findUser = await UserModel.findOne({email:email})
        if(findUser) return res.status(400).json({ message: 'user already exists' });

         const hash = await argon2.hash(password);   
        const user = await UserModel.create({  // Create user with hashed password
            name, 
            email, 
            password: hash,
           profilePic : profilePic ||'',
           gender:gender|| '',
           height: height|| '',
           weight:weight|| '',
           tags: tags  || ''
        });

            //passing email to otp creator to create OTP and send via email
        const response = await createOtp(email); 
            if(response === "OTP sent successfully") {
                    res.status(201).json({response});
            } else {
                // If OTP creation/sending failed
                await UserModel.findByIdAndDelete(user._id); // Rollback user creation
                return res.status(400).json({ 
                    message: "Sonething went wrong. Please Signup again again." 
                });
            }

    } catch (error) {
        console.error(`Error from user signup:`, error);

        if (error.name === "ValidationError") {
            // Extract validation errors and send to frontend
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Minimum length required...", errors: validationErrors });
        }
    
        if (error.code === 11000) {
            // Handle duplicate key error (unique fields like email/username)
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `The ${field} is already taken.` });
        }
    
        // Generic error response
        res.status(500).json({ message: "Internal server error" });
    }
    
};




//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const details = await generate_Credentials(email, password);
        res.status(200).send(details); //for proper correct output
    } catch (e) {
        res.status(e.status || 500).send({ message: e.message }); // any error catch here
    }
};





//seperated from log in because i need to use it insde otp verificaltion page also for direct redirection to chat
export const generate_Credentials = async (email, password) => {
    try {
            let user = null;
         if(password !== 'from_verify_otp'){ // because already verified in otp validation function comming from otp citroller
                 user = await UserModel.findOne({email});

                if (!user) {
                    const error = new Error("User not found...");
                    error.status = 404; 
                    throw error;
                }

                const verify = await argon2.verify(user.password, password);
                if (!verify) {
                    const error = new Error("Invalid credentials");
                    error.status = 401;  
                    throw error;
                }
            }
            else{
                    user = await UserModel.findOne({email}) 
            }

        const token = generateToken(user);

        return {
           name:user.name, 
            email:user.email, 
           profilePic : user.profilePic ,
           gender:user.gender,
           height: user.height,
           weight:user.weight,
           tags: user.tags,
            token,

        };

    } catch (error) {
        console.error("Error in User login:", error);
        if (!error.status) error.status = 500; 
        throw error;
    }
};


const profile_info = async(erq,res)=>{
    try {
        const user = await UserModel.findById(req.user._id);
        if(!user)
                return res.status(400).json({message:'user not found...'})
        res.status(200).json({
            name:user.name, 
            email:user.email, 
           profilePic : user.profilePic ,
           gender:user.gender,
           height: user.height,
           weight:user.weight,
           tags: user.tags,
        })
    } catch (e) {
        
    }
}


const update_profile = async (req, res) => {
    try {
        // Ensure `tags` is an array before updating
        const updateData = { ...req.body };
        if (Array.isArray(req.body.tags)) {
            updateData.tags = req.body.tags; // Replace existing tags with new ones
        }

        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        const token = generateToken(user);
        res.status(200).json({
            name:user.name, 
            email:user.email, 
           profilePic : user.profilePic ,
           gender:user.gender,
           height: user.height,
           weight:user.weight,
           tags: user.tags,
           token
        })
    } catch (e) {
        console.log('from profile update', e);
        res.status(500).send('server error');
    }
};





const sendResetEmail =   async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists
        const user = await UserModel.findOne({ email});

        if (!user) {
            return res.status(404).send("User with this email or Username does not exist");
        }

        // Generate reset token (valid for 20 minutes)
        const resetToken = jwt.sign({id:user._id, email: user.email, role:user.role },process.env.JWT_SECRET, {expiresIn: "10m"});

        const resetLink = `http://localhost:${process.env.PORT}/users/reset_password/${resetToken}`;
        // Configure mail transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODE_MAILER_ADMIN_EMAIL,
                pass: process.env.NODE_MAILER_ADMIN_PASS,
            },
        });

        // Send email with the reset link
        await transporter.sendMail({
            from: `"👋ECHOSPERE Support Team  <${process.env.NODE_MAILER_ADMIN_EMAI}>`,
            to: user.email, // Send to the user requesting the reset
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}, valid for 10 munite`,
            // html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p><p>This link will expire in 10 minutes.</p>`,
        });

        res.status(200).send("Password reset link sent to your email.");
    } catch (error) {
        console.error("Error in forget_password:", error.message);
        res.status(500).send("Internal server error.");
    }
};



// // this will be shown to clien after clicking on the email sended limk 
// // BROWSER is always GET req
//     //GET req
// UserRouter.get("/reset_password/:token",UserPasswoedResetWebPage);
// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newPassget = (req, res) => {
    let token = req.params.token;
    const filePath = path.join(__dirname, "../public/ResetPassword.html");
    res.sendFile(filePath);
};




//   new pasword capturing route
const newPassPost = async (req, res) => {
    // Extract new password from request body
    const { password } = req.body;

    try {
        const token = req.params.token; // Ensure token is passed in the request URL
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Hash the new password using Argon2
        const hashPass = await argon2.hash(password);

        // Update user password in the database
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: decoded.email }, // Email from decoded token
            { password: hashPass },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({ message: "Password reset successful! Please login." });
        } else {
            return res.status(404).json({ message: "User not found. Please try again later." });
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};








  export {
    register,
    login,
    sendResetEmail,
    newPassget,
    newPassPost,
    update_profile,
    profile_info
};