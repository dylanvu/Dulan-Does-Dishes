import styles from "../../styles/home/RecipeCard.module.css";
import Image from 'next/image'
import { createScrollObserver } from "../utils/scroll";
import { createValidElementId } from "../utils/id";
import { useEffect } from 'react';

interface RecipeCard {
    /**
     * Image src
     */
    img: string,

    /**
     * Title of the recipe
     */
    title: string
}

const RecipeCard = ({ card, size, tilt }: { card: RecipeCard, size: "small" | "large", tilt?: "left" | "right" | undefined }) => {
    useEffect(() => {
        const recipeCardElem = document.querySelector(`#${createValidElementId(card.title)}`) as HTMLElement;
        if (recipeCardElem) {
            const setVisible = (element: HTMLElement) => {
                element.style.opacity = "1";
                element.style.cursor = "pointer"
            }
            const setInvisible = (element: HTMLElement) => {
                element.style.opacity = "0";
                element.style.cursor = "auto"
            }
            createScrollObserver(recipeCardElem, 0.05, setVisible, recipeCardElem);
            // createScrollObserver(recipeCardElem, 0.05, setVisible, recipeCardElem, setInvisible, recipeCardElem);
        } else {
            throw new Error(`Tried to query ${createValidElementId(card.title)} for scrollable`)
        }

    })
    return (
        <div id={createValidElementId(card.title)} className={`${styles["recipe-card"]} ${tilt ? styles[`${tilt}-tilt`] : styles[`no-tilt`]}`}>
            <div className={`${styles["recipe-card-img-container"]} ${styles[`recipe-card-img-${size}`]}`} >
                <Image src={card.img} alt={card.title} layout="fill" />
            </div>
            <div className={styles["recipe-card-label"]}>
                {card.title}
            </div>
        </div>
    )
}

export default RecipeCard;