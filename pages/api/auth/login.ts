import { DBItem } from './../../../interfaces/data/common';
import { invalidLoginCollection, maxLoginAttempts } from './../../../backend/constants';
import { pushNewItem, getAllItems, clearCollection } from './../../../backend/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateJWT } from '../../../backend/auth';

const handleLoginAttempt = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(400).json("Invalid Request Type, needs to be POST");
    }

    // check if maximum login attempts have exceeded in database. This is to prevent brute force attacks
    const attempts = await getAllItems(invalidLoginCollection);
    if (attempts.length > maxLoginAttempts) {
        // if login attempts have exceeded, I (the website owner) need to manually clear the attempts
        res.status(401).json("Maximum login attempts have exceeded. Please contact website owner to clear invalid login attempts.");
        return;
    }


    const secretPassword = process.env.WEBSITE_PASSWORD;
    if (!secretPassword) {
        console.error("No password found in env");
        res.status(502).json("Could not verify login attempt due to server error regarding password. Please contact website owner.");
        return;
    }

    const body = req.body;
    if (body && body.length > 0) {
        // compare passwords
        // honestly I'm not implementing any encryption or something crazy since it's literally just a cooking website
        // ordinarily I'd probably implement a serverless login
        // generate an unhashed token and email it to my own account attached as a query parameter
        // hash the token and save it in the database with a TTL
        // in the api route, hash the token and check to see if it matches with the database or something
        // too lazy since it requires learning TTL in firebase, setting up another api route, and connecting my API to sendgrid again
        if (body === secretPassword) {
            console.log("Successful authentication");

            // generate JWT to be used as authentication to other api routes
            // the information in the JWT doesn't matter for this project
            const jwt = generateJWT("chef");
            // clear any invalid login attempts
            await clearCollection(invalidLoginCollection);

            res.status(200).json(jwt);
            return;
        } else {
            // invalid login attempt
            const loginAttempt: DBItem = {
                name: new Date().toUTCString()
            }
            // write attempt to database
            await pushNewItem(invalidLoginCollection, loginAttempt);

            // send res
            res.status(401).json("Password is incorrect. This login attempt has been recorded.");
            return;
        }
    } else {
        res.status(400).json("Password input is empty.");
        return;
    }

}

export default handleLoginAttempt;