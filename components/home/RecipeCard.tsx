import styles from "../../styles/home/RecipeCard.module.css";
import Image from 'next/image'
import { createScrollObserver } from "../utils/scroll";
import { createValidElementId } from "../utils/id";
import { useEffect } from 'react';
import { RecipeCard } from "../../interfaces/components/recipe";


const RecipeCard = ({ card, size, tilt, visible }: { card: RecipeCard, size: "small" | "large", tilt?: "left" | "right" | undefined | null, visible?: boolean }) => {
    useEffect(() => {
        if (!visible && card.title && card.title.length > 0) {
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
                console.error(`Tried to query ${createValidElementId(card.title)} for scrollable`);
            }
        }
    }, []);
    // TODO: RECIPE-CARD STYLING BREAKS THE IMAGE????
    return (
        <div id={createValidElementId(card.title)} className={`${styles["recipe-card"]} ${tilt ? `${styles[`${tilt}-tilt`]} ${styles["tilted"]}` : styles[`no-tilt`]} ${visible ? null : styles[`non-opaque`]}`}>
            <div className={`${styles["recipe-card-img-container"]} ${styles[`recipe-card-img-${size}`]}`} >
                {card.img.length > 0 ? <Image src={card.img} alt={card.title} layout="fill" /> : null}
            </div>
            <div className={styles["recipe-card-label"]}>
                {card.title}
            </div>
        </div>
    )
}

export default RecipeCard;