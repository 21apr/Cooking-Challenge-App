import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name:String,
    userName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    isAdmin:Boolean,
    friends:[String],
    rating: Number,
    image:String
})

export const User = mongoose.model('User',UserSchema);