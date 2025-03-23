import { Server } from "socket.io";
// import connectDB from "../configs/mongodb.config.js";
import jwt from 'jsonwebtoken';
import cors from 'cors'
// connectDB();

let io;

export function setupSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", 
        }
    });

    const activeUsers = {};

    // Socket.io Authentication Middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Authentication error"));
      
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded._id;
            socket.email = decoded.email;
            next();
        } catch (err) {

            next(new Error("Authentication error"));
        }
    });

    // **Socket.io Events**
    io.on("connection", (socket) => {


        // **Store User in Memory**
        activeUsers[socket.email] = { socketId: socket.id, email: socket.email, hashtags: [] };

        // **User submits hashtags**
        socket.on("find_chat", (hashtags) => {
            activeUsers[socket.email].hashtags = hashtags;

            // **Find a random match**
            let match = null;
            for (const [email, user] of Object.entries(activeUsers)) {
                if (email !== socket.email && user.hashtags.some(tag => hashtags.includes(tag))) {
                    match = user;
                    break;
                }
            }

            if (match) {
                // Send the email of the matching user
                socket.emit("chat_found", { chatWith: match.email });
                io.to(match.socketId).emit("chat_found", { chatWith: socket.email });
            } else {
                socket.emit("no_match_found");
            }
        });

        // **Handle messaging**
        socket.on("send_message", ({ message, to }) => {
            if (activeUsers[to]) {
                io.to(activeUsers[to].socketId).emit("receive_message", { message, from: socket.email });
            }
        });

        // **User disconnects**
        socket.on("disconnect", () => {
            delete activeUsers[socket.email];  // Remove from memory
        });
    });
};


// message aving not implimented yet....