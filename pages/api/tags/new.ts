// api route to create a new tag in the database
import type { NextApiRequest, NextApiResponse } from 'next'
import { pushNewItem } from '../../../backend/common';
import { tagsCollection } from '../../../backend/constants';
import { isTag } from '../../../interfaces/data/tag';

/**
 * Get create new tag
 * @param req 
 * @param res 
 * @returns 
 */
const createTag = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(400).json("Invalid Request Type, needs to be POST");
    }
    // validate input
    console.log(req.body);
    const body = req.body;
    if (isTag(body)) {
        console.log("Got new tag");
        await pushNewItem(tagsCollection, body);
        return res.status(201).json("Tag published to database");
    } else {
        // request data is bad
        console.error("The following thing did not pass the tag typecheck");
        console.error(JSON.stringify(body));
        return res.status(400).json("Item sent is not a tag");
    }
}

export default createTag;