import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profilePic: { 
        type: String, 
        default: "", 
        trim: true 
    },
    name: { 
        type: String, 
        required: [true, "Name is required."], 
        trim: true, 
        minlength: [4, "Name must be at least 4 characters."], 
        maxlength: [50, "Name cannot exceed 50 characters."]
    },
    email: { 
        type: String, 
        required: [true, "Email is required."], 
        unique: true, 
        trim: true, 
        lowercase: true, 
        match: [/^\S+@\S+\.\S+$/, "Enter a valid email address (e.g., user@example.com)."]
    },
    password: { 
        type: String, 
        required: [true, "Password is required."], 
        trim: true, 
        minlength: [5, "Password must be at least 5 characters."]
    },
    gender:{
        default:'notspecified...',
        type:String,
        trim:true,
        //  enum:['male','female','prefer-not-to-say']
    },
    height:{
        type:Number,
        trim:true
    },
    weight:{
        type:Number,
        trim:true 
    },
    tags: [{
        type: String,
        trim: true
    }]
    

},
{ timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
