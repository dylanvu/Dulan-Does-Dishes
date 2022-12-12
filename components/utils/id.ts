export function createValidElementId(id: string): string {
    let newId = id;
    newId = newId.trim();
    newId = newId.replaceAll(" ", "-");
    newId = newId.replaceAll(",", "");
    newId = newId.replaceAll("'", "");
    return newId;
}