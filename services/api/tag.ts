import { TagModel, Tag } from "../../interfaces/data/tag";
import { apiBase } from "../../components/constants";
export const getAllTags = async (): Promise<TagModel[] | null> => {
    // http request to api
    try {
        const res = await fetch(`${apiBase}/tags/all`);
        if (res.ok) {
            console.log("getAllTags succeeded");
            return await res.json();
        } else {
            console.error("getAllTags returned a " + res.status);
            return [];
        }
    } catch (e) {
        console.error("Could not get all tags due to " + e);
        return null;
    }
}

export const createTag = async (data: Tag) => {
    console.log("Creating new tag", data);
    // convert the tag object into something the database needs
    const newTag: TagModel = { ...data, recipes: [] };
    try {
        const res = await fetch(`${apiBase}/tags/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTag)
        });

        if (res.ok) {
            return res.body;
        } else {
            throw new Error("Failed due to " + res.body);
        }
    } catch (e) {
        console.error("Could not create tag because of " + JSON.stringify(e));
        throw new Error("Failed due to " + JSON.stringify(e));
    }

}