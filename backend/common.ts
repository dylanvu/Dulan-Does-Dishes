// common functions used in the backend
import { DBItem } from "../interfaces/data/common";
import { firestore } from './_app';
import { recipesCollection, tagsCollection } from "./constants";
import { createRecipeURL } from "../components/utils/id";


/**
 * Query a firestore collection and return an item
 * @param collection the collection to query
 * @param name the name of the item to search for
 * @returns 
 */
export const getSingleItem = async (collection: string, name: string): Promise<DBItem | null> => {
    const docRef = firestore.collection(collection).doc(name);
    const doc = await docRef.get();
    if (!doc.exists) {
        console.error(`Could not find ${name} in ${collection} - getSingleItem`);
        return null;
    } else {
        return doc.data() as DBItem;
    }
}

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
        console.log(`getAllItems found ${itemArray.length} items inside of ${collection}`);
    }
    return itemArray;
}

/**
 * Updates or creates a new item in firestore
 * @param collection collection to add/update to
 * @param data the data to update to
 */
export const pushNewItem = async (collection: string, data: DBItem): Promise<void> => {
    const docName = "url" in data ? data.url as string : createRecipeURL(data.name);
    await firestore.collection(collection).doc(docName).set(data, { merge: true });
    console.log(`done uploading new item with id ${docName}`);
    return;
}