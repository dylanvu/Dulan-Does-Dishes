import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../backend/_app';

/**
 * Get all tags
 * @param req 
 * @param res 
 * @returns 
 */
const getAllTags = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(400).send("Invalid Request Type");
    }
    const doc = {
        "abc": "abc"
    }
    firestore.collection("tags").add(doc)
    res.status(200).send(JSON.stringify(doc));
}

export default getAllTags;