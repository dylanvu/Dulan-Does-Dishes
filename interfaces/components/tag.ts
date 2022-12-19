import { tag } from "../data/recipe"
/**
 * Interface for working with the chakra UI tag in the new recipe page
 */
export interface tagButton extends tag {
    size: "sm" | "md" | "lg"
}