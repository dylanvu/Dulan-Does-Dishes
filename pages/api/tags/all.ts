import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllItems } from '../../../backend/common';
import { tagsCollection } from '../../../backend/constants';
import { isTag, Tag } from '../../../interfaces/data/tag';

/**
 * Get all tags
 * @param req 
 * @param res 
 * @returns 
 */
const getAllTags = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        console.log(`Client sent a ${req.method} insead of a GET for all tags`);
        return res.status(400).send("Invalid Request Type, needs to be GET");
    }
    console.log("Getting all tags");
    const queryRes = await getAllItems(tagsCollection);
    if (queryRes) {
        console.log(queryRes.length);
        // only send back recipe items
        const tagArray: Tag[] = [];
        for (const item of queryRes) {
            if (isTag(item)) {
                tagArray.push(item);
            } else {
                console.log(item.name + " is not a tag");
            }
        }
        // send everything that matches
        console.log(`Found all ${tagArray.length} tags`);
        return res.status(200).json(tagArray);
    } else {
        console.error("All tags returned null");
        return res.status(502).send("Error");
    }
}

export default getAllTags;