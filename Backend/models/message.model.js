import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    senderId :{type:mongoose.Types.ObjectId , href :'User', required:true},
    reciverId :{type:mongoose.Types.ObjectId , href :'User',required:true},
    message: String
});


export const MessageModel = mongoose.model('message',chatSchema)