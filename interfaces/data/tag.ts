import { DBItem } from './common';
import { Recipe } from "./recipe"

export interface Tag extends DBItem {
    /**
     * Color of the tag
     */
    color: string,
}

export function isTag(arg: Object): arg is Tag {
    if (!("color" in arg)) {
        return false;
    }

    if (typeof arg.color !== "string") {
        return false;
    }

    return true;
}

export interface TagModel {
    recipes: Recipe[]
}