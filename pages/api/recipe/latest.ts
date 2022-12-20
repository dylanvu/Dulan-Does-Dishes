// get the latest recipes according to the query parameter
import type { NextApiRequest, NextApiResponse } from 'next';
import { recipesCollection } from '../../../backend/constants';
import { getLatestItem } from '../../../backend/common';

/**
 * Gets the latest number of dishes. Count must be specified
 * @param req 
 * @param res 
 * @returns 
 */
const getLatestRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        console.error(`Client sent a ${req.method} insead of a GET for the latest dishes`);
        res.status(400).send("Invalid Request Type, needs to be GET");
        return;
    }
    // get parameter from request
    const params = req.query;
    if ("count" in params && params.count) {
        // try to convert to number
        const countInt = parseInt(params.count as string);
        if (!isNaN(countInt)) {
            const query = await getLatestItem(recipesCollection, countInt);
            if (query) {
                return res.status(200).json(query);
            } else {
                return res.status(502).send(`Could not obtain latest recipes. Contact the owner of the website.`);
            }
        } else {
            // not a number
            console.error(`${params.count} is not a number`);
            return res.status(400).send(`Incorrect parameter to api route. ${params.count} is not a number.`);
        }

    } else {
        // request data is bad
        console.error(`Params did not have count in it`);
        console.log(params);
        return res.status(400).send("Incorrect parameter to api route. Missing \"count\".");
    }
}

export default getLatestRecipe;
