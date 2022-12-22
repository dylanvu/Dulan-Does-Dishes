import { Recipe } from "../../interfaces/data/recipe";
import { apiBase } from "../../components/constants";
export const getAllRecipes = async (): Promise<Recipe[] | null> => {
    // http request to api
    try {
        const res = await fetch(`${apiBase}/recipes/all`);
        if (res.ok) {
            return await res.json();
        } else {
            console.error("getAllRecipes returned a " + res.status);
            return [];
        }
    } catch (e) {
        console.error("Could not get all recipes due to " + e);
        return null;
    }
}

export const createRecipe = async (data: Recipe, jwt: string | null) => {
    if (!jwt) {
        console.error("Missing JWT");
        throw new Error("You are not logged in!");
    }
    console.log("Creating new recipe", data);
    try {
        const res = await fetch(`${apiBase}/recipes/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            return res.body;
        } else {
            throw new Error("Failed due to " + res.body);
        }
    } catch (e) {
        console.error("Could not create recipe because of " + JSON.stringify(e));
        throw new Error("Failed due to " + JSON.stringify(e));
    }

}

export const getRecipeData = async (recipeName: string): Promise<Recipe | null> => {
    console.log(`Getting ${recipeName} from api`)
    try {
        const res = await fetch(`${apiBase}/recipes/recipe?name=${recipeName}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            console.log(`request for ${recipeName} succeeded`)
            const json = await res.json() as Recipe;
            return json;
        } else {
            console.error(`request for ${recipeName} failed due to ` + res.body);
            throw new Error(`Failed to get data for ${recipeName} due to ` + res.body);
        }

    } catch (e) {
        console.error(`Could not get recipe data for ${recipeName} because of ` + e);
        return null;
    }
}

export const getLatestRecipes = async (count: number): Promise<Recipe[] | null> => {
    console.log(`Getting ${count} latest recipes from api`)
    try {
        const res = await fetch(`${apiBase}/recipes/latest?count=${count}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            console.log(`request for ${count} latest recipes succeeded`)
            const json = await res.json() as Recipe[];
            return json;
        } else {
            console.error(`request for ${count} latest recipes failed due to ` + res.body);
            throw new Error(`Failed to get data for ${count} recipes due to ` + res.body);
        }

    } catch (e) {
        console.error(`Could not get latest recipes for ${count} recipes because of ` + e);
        return null;
    }
}

export const getDailyRecipes = async (): Promise<Recipe[] | null> => {
    console.log(`Getting daily recipes from api`);
    try {
        const res = await fetch(`${apiBase}/recipes/daily`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            console.log(`request for daily recipes succeeded`)
            const json = await res.json() as Recipe[];
            return json;
        } else {
            console.error(`request for daily recipes failed due to ` + res.body);
            throw new Error(`Failed to get data for daily recipes due to ` + res.body);
        }

    } catch (e) {
        console.error(`Could not get daily recipes because of ` + e);
        return null;
    }
}