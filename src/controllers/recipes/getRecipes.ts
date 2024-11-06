import { Recipe } from "../../model/recipes/recipeModel";

export async function getRecipes(req: any, res: any) {
    try {
        const recipes = await Recipe.find();
        res.send({ ok: true, recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}