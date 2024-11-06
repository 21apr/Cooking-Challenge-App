import express from "express";
import { getRecipes } from "../../controllers/recipes/getRecipes";
import { setRecipe } from "../../controllers/recipes/setRecipe";

const router = express.Router();

router.post("/set-recipe", setRecipe).get("/get-recipes", getRecipes);

export default router;