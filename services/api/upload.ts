import { Recipe } from "../../interfaces/recipe";

/**
 * Call the API to upload a recipe
 * @param recipe 
 */
export const uploadRecipe = async (recipe: Recipe) => {
    console.log("Added recipe to database");
    // api call
    // on .catch, changeUploadState to be "api-error"
    // on a .then, changeUploadState to be "success"
}