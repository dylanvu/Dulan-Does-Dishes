import styles from "../../styles/common/RecipeCard.module.css";
import Image from 'next/image'
import { createScrollObserver } from "../utils/scroll";
import { createValidElementId } from "../utils/id";
import { useEffect, useState } from 'react';
import { RecipeCard } from "../../interfaces/components/recipe";
// import { decompress } from "lz-string";


const RecipeCard = ({ card, size, tilt, visible, titleInvisible }: { card: RecipeCard, size: "small" | "large", tilt?: "left" | "right" | undefined | null, visible?: boolean, titleInvisible?: boolean }) => {
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

    useEffect(() => {
        // // decompress image
        // const decomp = decompress(card.img);
        // if (decomp) {
        //     setImgDecompressed(decomp);
        // }
        setImgDecompressed(card.img);
    }, [card.img]);

    const [imgDecompressed, setImgDecompressed] = useState<string>("");

    return (
        <div id={createValidElementId(card.title)} className={`${styles["recipe-card"]} ${tilt ? `${styles[`${tilt}-tilt`]} ${styles["tilted"]}` : styles[`no-tilt`]} ${visible ? styles[`non-opaque`] : ""}`}>
            <div className={`${styles["recipe-card-img-container"]} ${styles[`recipe-card-img-${size}`]}`} >
                {imgDecompressed.length > 0 ? <Image src={imgDecompressed} alt={card.title} layout="fill" /> : null}
            </div>
            {!titleInvisible && card.title.length > 0 ?
                <div className={styles["recipe-card-label"]}>
                    {card.title}
                </div>
                : null}

        </div>
    )
}

export default RecipeCard;