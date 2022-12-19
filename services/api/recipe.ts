import { Recipe } from "../../interfaces/data/recipe";
import { apiBase } from "../../components/constants";
export const getAllRecipes = async () => {
    // http request to api
}

export const createRecipe = async (data: Recipe) => {
    const res = await fetch(`${apiBase}recipe/new`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        return res.body;
    } else {
        throw new Error("Failed due to " + res.body)
    }
}