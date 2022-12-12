import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../_app';

const getAllRecipes = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(400).send("Invalid Request Type");
    }
    const doc = {
        "abc": "abc"
    }
    firestore.collection("recipes").add(doc)
    res.status(200).send(JSON.stringify(doc));
}

export default getAllRecipes;