
import styles from "../../styles/home/RecipeBlock.module.css";
import RecipeCard from "../common/RecipeCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Progress } from "@chakra-ui/react";
import { Recipe } from "../../interfaces/data/recipe";

const RecipeBlock = ({ imgLeft, card, tilt, text }: { imgLeft?: boolean, card: Recipe, tilt?: "left" | "right", text: "rating" | "background" | "postCooking" }) => {
    const router = useRouter();

    const [clicked, toggleClicked] = useState<boolean>(false);

    const handleClick = () => {
        if (card.url) {
            toggleClicked(true);
            router.push(`/recipes/${card.url}`);
        }
    }

    const [blockText, setBlockText] = useState(card[text]);

    useEffect(() => {
        const cardText = card[text];
        if (!cardText || cardText.length === 0) {
            // try to get something else
            for (const key of possibleKeys) {
                const keyText = card[key];
                if (keyText && keyText.length > 0) {
                    setBlockText(keyText);
                    return;
                }
            }
            // make a placeholder text
            const placeholder = `Introducing, ${card.name}! Is it a great dish? A bad dish? You'll have to click to find out!`;
            setBlockText(placeholder);
        } else {
            setBlockText(cardText);
        }
    }, []);

    const possibleKeys: Array<"rating" | "background" | "postCooking"> = ["rating", "background", "postCooking"]

    return (
        <div className={`${styles["recipe-block"]} ${tilt ? styles[`tilt-${tilt}`] : null}`}>
            <div className={styles["recipe-block-text-container"]}>
                <div className={styles["recipe-block-text"]}>
                    {blockText}
                </div>
                <div className={styles["see-recipe-container"]} onClick={handleClick}>
                    <div>
                        See the Recipe!
                    </div>
                    {clicked ?
                        <div className={styles["progress-container"]}>
                            <Progress isIndeterminate size="sm" colorScheme="teal" />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <div className={styles["block-card-container"]}>
                <RecipeCard card={card} size="large" tilt="right" />
            </div>
            {/* <div className={styles["recipe-block-img-container"]}>
                <Image src="/static/img/kho.jpg" layout="fill" />
            </div> */}
        </div>
    )
}

export default RecipeBlock;