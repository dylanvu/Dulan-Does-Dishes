import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllItems } from '../../../backend/common';
import { recipesCollection } from '../../../backend/constants';
import { isRecipe, Recipe } from '../../../interfaces/data/recipe';

/**
 * Get all recipes
 * @param req 
 * @param res 
 * @returns 
 */
const getAllRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(400).send("Invalid Request Type, needs to be GET");
    }
    const queryRes = await getAllItems(recipesCollection);
    if (queryRes) {
        // only send back recipe items
        const recipeArray: Recipe[] = [];
        for (const item of queryRes) {
            if (isRecipe(item)) {
                recipeArray.push(item);
            }

            // send everything that matches
            res.status(200).json(recipeArray);
        }
    } else {
        console.error("All recipes returned null");
        res.status(502).send("Error");
    }
}

export default getAllRecipes;