import { Recipe } from "../data/recipe";

export interface RecipeCard {
    /**
     * Image src
     */
    img: string,

    /**
     * Title of the recipe
     */
    title: string
}

export interface RecipeBox extends Recipe {
    /**
     * Whether the component should show url at the top or not
     */
    previewURL: boolean;
}