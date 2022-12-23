// api route to get a singular dish's information based on a parameter query
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSingleItem } from '../../../backend/common';
import { recipesCollection } from '../../../backend/constants';
import { isRecipe } from '../../../interfaces/data/recipe';

const getSingleDish = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        console.log(`Client sent a ${req.method} insead of a GET for single dish`);
        res.status(400).json("Invalid Request Type, needs to be GET");
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
                return res.status(201).json(recipe);
            } else {
                // something wrong with backend data
                console.error(`Found ${name} inside of ${recipesCollection} but it did not pass the recipe typeguard`);
                return res.status(502).json(`Found item with same id but it is not a recipe. Contact the owner of the website.`);
            }
        } else {
            // could not find item
            console.error(`Could not find recipe named ${name}`)
            return res.status(404).json(`Could not find recipe named ${name}`);
        }
    } else {
        // request data is bad
        console.error(`Params did not have name in it`);
        console.log(params);
        return res.status(400).json("Incorrect parameter to api route. Missing \"name\".");
    }
}

export default getSingleDish;
