export function createValidElementId(id: string): string {
    let newId = id;
    newId = newId.trim();
    newId = newId.replaceAll(" ", "-");
    newId = newId.replaceAll(",", "");
    newId = newId.replaceAll("'", "");
    return newId;
}

/**
 * Converts a recipe name to a url by swapping spaces with dashes and making everything lowercase
 * @param name the recipe name to convert to a URL
 */
export function createRecipeURL(name: string): string {
    let url = name;
    url = name.trim();
    url = url.toLowerCase();
    url = url.replaceAll(" ", "-");
    url = url.replaceAll("(dulan original)", "");
    url = url.replaceAll(",", "");
    url = url.replaceAll("'", "");
    return url;
}