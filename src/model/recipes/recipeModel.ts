import { time } from "console";
import mongoose from "mongoose";

export const RecipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    description: String,
    time: Number,
    difficulty: String,
    category: String,
    servings: Number,
    instructions: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    rating: Number,
    isPublished: Boolean,
    isDeleted: Boolean,
    date: {type: Date, default: Date.now},
    tags: [String],
    image: String
})

export const Recipe = mongoose.model('Recipe',RecipeSchema)