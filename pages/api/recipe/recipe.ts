// api route to get a singular dish's information based on a parameter query
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSingleItem } from '../../../backend/common';
import { recipesCollection } from '../../../backend/constants';
import { isRecipe } from '../../../interfaces/data/recipe';

const getSingleDish = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        console.log(`Client sent a ${req.method} insead of a GET for single dish`);
        res.status(400).send("Invalid Request Type, needs to be GET");
        return;
    }
    // get parameter from request
    const params = req.query;
    if ("name" in params) {
        const name = params.name as string;
        console.log(`Got query for ${name}`);
        const recipe = await getSingleItem(recipesCollection, name);
        if (recipe) {
            // validate result
            if (isRecipe(recipe)) {
                console.log(`Successfully got recipe matching ${name} from ${recipesCollection}`);
                res.status(201).json(recipe);
            } else {
                // something wrong with backend data
                console.error(`Found ${name} inside of ${recipesCollection} but it did not pass the recipe typeguard`);
                res.status(502).send(`Found item with same id but it is not a recipe. Contact the owner of the website.`);
            }
        } else {
            // could not find item
            res.status(404).send(`Could not find recipe named ${name}`);
        }
    } else {
        // request data is bad
        console.error(`Params did not have name in it`);
        console.log(params);
        res.status(400).send("Incorrect parameter to api route. Missing \"name\".");
    }
}

export default getSingleDish;
