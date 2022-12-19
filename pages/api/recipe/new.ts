// creates a new recipe entry in backend
import type { NextApiRequest, NextApiResponse } from 'next'
import { pushNewItem } from '../../../backend/common';
import { recipesCollection } from '../../../backend/constants';
import { isRecipe } from '../../../interfaces/data/recipe';

/**
 * Get create new recipe
 * @param req 
 * @param res 
 * @returns 
 */
const createRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(400).send("Invalid Request Type, needs to be POST");
        return;
    }
    // validate input
    // console.log(req.body);
    const body = req.body;
    if (isRecipe(body)) {
        console.log("Got new recipe");
        await pushNewItem(recipesCollection, body);
        res.status(201).send("Recipe published to database");
    } else {
        // request data is bad
        console.error("The following thing did not pass the recipe typecheck");
        console.error(JSON.stringify(body));
        res.status(400).send("Item sent is not a recipe");
    }
}

export default createRecipe;