import http from 'http';
import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./configs/mongodb.config.js";

import UserRouter from "./routes/user.route.js";
import { OTP_router } from './routes/otp.route.js';
import { WorkoutRouter } from './routes/workout.router.js';
import avatar_upload_router from './routes/profile_img_upload.route.js';
import { setupSocket } from './controllers/message.controller.js';

const app = express();
const server = http.createServer(app);
setupSocket(server)


app.use(express.json());
app.use(cors())



app.use('/users',UserRouter);
app.use('/verify',OTP_router)
app.use('/workout',WorkoutRouter)
app.use('/profile_photo',avatar_upload_router)





const PORT = process.env.PORT || 5000;


server.listen(+PORT,async () => {
    await connectDB();
    console.log('server started...');
    
})


