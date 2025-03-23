import dotenv from 'dotenv';
dotenv.config()

import mongoose from "mongoose";
let connection = null; 

async function connectDB() {
    if (!connection) {
        connection = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("✅ Connected to MongoDB");
    }
    return connection;
}


export default connectDB;
