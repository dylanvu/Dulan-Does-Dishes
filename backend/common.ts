// common functions used in the backend
import { DBItem } from "../interfaces/data/common";
import { firestore } from './_app';
import { recipesCollection, tagsCollection } from "./constants";


/**
 * Query a firestore collection and return an item
 * @param collection the collection to query
 * @param name the name of the item to search for
 * @returns 
 */
// export const getSingleItem = async (collection: string, name: string): Promise<DBItem | null> => {
//     // TODO: This thing will work for recipes, tags, and really anything else
//     return {};
// }

/**
 * Query a collection for all the items
 */
export const getAllItems = async (collection: string): Promise<DBItem[] | null> => {
    const itemArray: DBItem[] = [];
    const collectionRef = firestore.collection(collection);
    const snap = await collectionRef.get();
    if (snap.empty) {
        console.error(`Snapshot is empty after querying ${collection}`);
        return null;
    } else {
        // add each doc as the appropriate type
        snap.forEach(doc => {
            let dbItem = { name: "fakeName" };
            if (collection === recipesCollection || collection === tagsCollection) {
                // create a recipe or a tag
                dbItem = doc.data() as DBItem;
            } else {
                console.error("Unknown collection of " + collection);
                dbItem = { name: doc.id };
            }
            itemArray.push(dbItem);
        });
    }
    return itemArray;
}

/**
 * Updates or creates a new item in firestore
 * @param collection collection to add/update to
 * @param data the data to update to
 */
export const pushNewItem = async (collection: string, data: DBItem): Promise<void> => {
    await firestore.collection(collection).doc(data.name).set(data, { merge: true });
    console.log("done uploading new item")
    return;
}