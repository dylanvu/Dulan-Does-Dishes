
/**
 * Check to see if a name contains the substring in question along with similar variations
 * @param name 
 * @param substring 
 */
export const checkName = (name: string, substring: string): boolean => {
    // sanitize both inputs
    name = name.toLowerCase().trim();
    substring = substring.toLowerCase().trim();

    // look for a direct match
    if (name.includes(substring)) {
        return true;
    }

    // remove all spaces and try again
    const spacelessName = name.replaceAll(" ", "");
    const spacelessSubstr = substring.replaceAll(" ", "");
    if (spacelessName.includes(spacelessSubstr)) {
        return true;
    }

    return false;
}