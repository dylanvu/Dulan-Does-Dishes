import styles from "../../styles/common/RecipeCard.module.css";
import Image from 'next/image'
import { createScrollObserver } from "../utils/scroll";
import { createValidElementId } from "../utils/id";
import { useEffect, useState } from 'react';
import { RecipeCard } from "../../interfaces/components/recipe";
import { CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Recipe } from "../../interfaces/data/recipe";

/**
 * 
 * @param param0 unique key specifies an additional add on to the element id. This is for the homepage where latest and featured may be the same dish, and so no unique id can be generated just by the title
 * @returns 
 */
const RecipeCard = ({ card, size, tilt, visible, titleInvisible, uniqueKey }: { card: RecipeCard | Recipe, size: "small" | "large", tilt?: "left" | "right" | undefined | null, visible?: boolean, titleInvisible?: boolean, uniqueKey?: string }) => {

    // const [imgDecompressed, setImgDecompressed] = useState<string>("");

    const [clicked, toggleClicked] = useState<boolean>(false);

    const router = useRouter();

    const [elementID, setElementID] = useState("");
    const [observer, setIntersectionObserver] = useState<IntersectionObserver>();

    useEffect(() => {
        if (!visible && card && card.name && card.name.length > 0) {
            // add a manually specified unique key to the end of the id
            let uKey = "";
            if (uniqueKey) {
                uKey = uniqueKey;
            }
            const validElementID = createValidElementId(card.name + uKey);
            setElementID(validElementID)
        }
    }, []);

    useEffect(() => {
        // remove current observer
        if (observer) {
            observer.disconnect()
        }
        // create a new one
        if (elementID.length > 0) {
            const recipeCardElem = document.querySelector(`#${elementID}`) as HTMLElement;
            if (recipeCardElem) {
                const setVisible = (element: HTMLElement) => {
                    element.style.opacity = "1";
                    element.style.cursor = "pointer"
                }
                const setInvisible = (element: HTMLElement) => {
                    element.style.opacity = "0";
                    element.style.cursor = "auto"
                }
                const newObserver = createScrollObserver(recipeCardElem, 0.05, setVisible, recipeCardElem);
                setIntersectionObserver(newObserver);
                // createScrollObserver(recipeCardElem, 0.05, setVisible, recipeCardElem, setInvisible, recipeCardElem);
            } else {
                console.error(`Could not find ${elementID} to add observer to`);
            }
        }
    }, [elementID])

    const handleClick = () => {
        if (card.url) {
            toggleClicked(true);
            router.push(`/recipes/${card.url}`);
        }
    }

    return (
        <div id={elementID} className={`${styles["recipe-card"]} ${tilt ? `${styles[`${tilt}-tilt`]} ${styles["tilted"]}` : styles[`no-tilt`]} ${visible ? styles[`non-opaque`] : ""}`} onClick={handleClick}>
            {clicked ?
                <div className={styles["progress-overlay"]}>
                    <CircularProgress isIndeterminate color="teal" size="2em" />
                </div>
                :
                null
            }
            <div className={`${styles["recipe-card-img-container"]} ${styles[`recipe-card-img-${size}`]}`} >
                {card && card.img && card.img.length > 0 ? <Image src={card.img} alt={card.name} layout="fill" /> : null}
            </div>

            {!titleInvisible && !clicked && card.name.length > 0 ?
                <div className={styles["recipe-card-label"]}>
                    {card.name}
                </div>
                : null}
        </div >
    )
}

export default RecipeCard;