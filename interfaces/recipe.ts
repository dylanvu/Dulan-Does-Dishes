
export interface Recipe {
    /**
     * Image src
     */
    img: string,

    /**
     * Title of the recipe
     */
    title: string,

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

    tags: tag[];
}

export interface RecipeBox extends Recipe {
    /**
     * Whether the component should show url at the top or not
     */
    previewURL: boolean;
}

export interface tag {
    name: string,
    color: string,
}

/**
 * Interface for working with the chakra UI tag in the new recipe page
 */
export interface tagButton extends tag {
    size: "sm" | "md" | "lg"
}