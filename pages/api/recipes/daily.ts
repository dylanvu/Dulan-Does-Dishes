// route to get the hardcoded count daily dishes

import type { NextApiRequest, NextApiResponse } from 'next';
import { recipesCollection } from '../../../backend/constants';
import { getLatestItem } from '../../../backend/common';

/**
 * Gets the daily dishes
 * @param req 
 * @param res 
 * @returns 
 */
const getDailyRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        console.error(`Client sent a ${req.method} insead of a GET for the latest dishes`);
        res.status(400).send("Invalid Request Type, needs to be GET");
        return;
    }

    // hardcode 2 for now
    const query = await getLatestItem(recipesCollection, 2);
    if (query) {
        return res.status(200).json(query);
    } else {
        return res.status(502).send(`Could not obtain latest recipes. Contact the owner of the website.`);
    }

}

export default getDailyRecipes;