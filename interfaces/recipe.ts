
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

    ingredients: string[];

    steps: string[];

    rating: string | null;

    background: string | null;

    postCooking: string | null;

    tags: string[];
}