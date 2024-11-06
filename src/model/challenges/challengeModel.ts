import { time } from "console";
import mongoose from "mongoose";

export const ChallengeSchema = new mongoose.Schema({
    title: String ||
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String || undefined,
    timeOff: Number,
    imageResult: String
})