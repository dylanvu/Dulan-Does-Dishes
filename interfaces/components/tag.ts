import { Tag } from "../data/tag"
/**
 * Interface for working with the chakra UI tag in the new recipe page
 */
export interface tagButton extends Tag {
    size: "sm" | "md" | "lg"
}