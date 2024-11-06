import { set } from "mongoose";
import { Recipe } from "../../model/recipes/recipeModel";
import { setFile } from "../file-server/setFile";

export async function setRecipe(req: any, res: any) {
    try {
        const picName = setFile(req, res);
        const { title, ingredients, description, time, difficulty, category, servings, instructions, image } = req.body;
        const recipe = new Recipe({ title, ingredients, description, time, difficulty, category, servings, instructions, image: picName });
        // const recipe = new Recipe({ title, ingredients, description, time, difficulty, category, servings, instructions, image: picName, author: req.user._id });
        if (!recipe) {
            return res.status(400).send({ error: 'Recipe not found' });
        }
        await recipe.save();
        console.log('recipe saved',recipe);
        res.status(200).send({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}