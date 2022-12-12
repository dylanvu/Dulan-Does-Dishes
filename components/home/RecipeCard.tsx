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

const RecipeCard = (props: RecipeCard) => {
    useEffect(() => {
        const recipeCardElem = document.querySelector(`#${createValidElementId(props.title)}`) as HTMLElement;
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
            throw new Error(`Tried to query ${createValidElementId(props.title)} for scrollable`)
        }

    })
    return (
        <div id={createValidElementId(props.title)} className={styles["recipe-card"]}>
            <div className={styles["recipe-card-img-container"]} >
                <Image src={props.img} alt={props.title} layout="fill" />
            </div>
            <div className={styles["recipe-card-label"]}>
                {props.title}
            </div>
        </div>
    )
}

export default RecipeCard;