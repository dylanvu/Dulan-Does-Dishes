import styles from "../../styles/common/RecipeCard.module.css";
import Image from 'next/image'
import { createScrollObserver } from "../utils/scroll";
import { createValidElementId } from "../utils/id";
import { useEffect, useState } from 'react';
import { RecipeCard } from "../../interfaces/components/recipe";
import { CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/router";


const RecipeCard = ({ card, size, tilt, visible, titleInvisible }: { card: RecipeCard, size: "small" | "large", tilt?: "left" | "right" | undefined | null, visible?: boolean, titleInvisible?: boolean }) => {

    const [imgDecompressed, setImgDecompressed] = useState<string>("");

    const [clicked, toggleClicked] = useState<boolean>(false);

    const router = useRouter();

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
        setImgDecompressed(card.img);
    }, [card.img]);

    const handleClick = () => {
        if (card.url) {
            toggleClicked(true);
            router.push(`/recipes/${card.url}`);
        }
    }

    return (
        <div id={createValidElementId(card.title)} className={`${styles["recipe-card"]} ${tilt ? `${styles[`${tilt}-tilt`]} ${styles["tilted"]}` : styles[`no-tilt`]} ${visible ? styles[`non-opaque`] : ""}`} onClick={handleClick}>
            {clicked ?
                <div className={styles["progress-overlay"]}>
                    <CircularProgress isIndeterminate color="teal" size="2em" />
                </div>
                :
                null
            }
            <div className={`${styles["recipe-card-img-container"]} ${styles[`recipe-card-img-${size}`]}`} >
                {imgDecompressed.length > 0 ? <Image src={imgDecompressed} alt={card.title} layout="fill" /> : null}
            </div>

            {!titleInvisible && !clicked && card.title.length > 0 ?
                <div className={styles["recipe-card-label"]}>
                    {card.title}
                </div>
                : null}
        </div >
    )
}

export default RecipeCard;