import { DBItem } from "./common";
import { Tag } from "./tag";

export interface Recipe extends DBItem {
    /**
     * Image src
     */
    img: string,

    /**
     * URL friendly title, will be accessed via /recipes/url-friendly-title
     */
    url: string,

    /**
     * list of ingredients
     */
    ingredients: string[];

    steps: string[];

    rating: string | null;

    background: string | null;

    postCooking: string | null;

    tags: Record<string, Tag>;

    date: string;
}

export function isRecipe(arg: any): arg is Recipe {
    if (!("img" in arg)) {
        return false;
    }
    if (typeof arg.img !== "string") {
        return false;
    }

    if (!("url" in arg)) {
        return false;
    }
    if (typeof arg.url !== "string") {
        return false;
    }

    if (!("ingredients" in arg)) {
        return false;
    }

    if (!("steps" in arg)) {
        return false;
    }
    if (!("rating" in arg)) {
        return false;
    }
    if (!("background" in arg)) {
        return false;
    }
    if (!("postCooking" in arg)) {
        return false;
    }
    if (!("tags" in arg)) {
        return false;
    }
    if (!("date" in arg)) {
        return false;
    }

    return true;
}

export function isRecipeArray(arg: any): arg is Recipe[] {
    if (!Array.isArray(arg)) {
        return false;
    }

    for (const item of arg) {
        if (!isRecipe(item)) {
            return false;
        }
    }

    return true;
}