import { DBItem } from './common';
import { Recipe } from "./recipe"

export interface Tag extends DBItem {
    /**
     * Color of the tag
     */
    color: string,
    size?: string
}

export function isTag(arg: any): arg is Tag {
    if (!("color" in arg)) {
        return false;
    }

    if (typeof arg.color !== "string") {
        return false;
    }

    return true;
}

/**
 * This is what gets put into the database
 */
export interface TagModel extends Tag {
    recipes: Recipe[]
}

export function isTagModel(arg: any): arg is TagModel {
    if (!isTag(arg)) {
        return false;
    }

    if (!("recipes" in arg)) {
        return false;
    }

    return true;
}