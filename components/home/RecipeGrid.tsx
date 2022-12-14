import RecipeCard from './RecipeCard';
import styles from "../../styles/home/RecipeGrid.module.css";

interface RecipeGrid {
    recipes: RecipeCard[];
    size: "small" | "large";
    flex: boolean
}


const RecipeGrid = (props: RecipeGrid) => {
    const tiltOptions: Array<"left" | "right" | null> = ["left", "right"];
    return (
        <div className={`${styles["recipe-grid-container"]}`}>
            <div className={props.flex ? styles["recipe-flex-box"] : styles["recipe-grid"]}>
                {props.recipes.map((recipe) => {
                    const randomTilt = tiltOptions[Math.floor(Math.random() * tiltOptions.length)];
                    return (
                        <RecipeCard card={recipe} key={recipe.title} size={props.size} tilt={randomTilt} />
                    )
                })}
            </div>
        </div>

    )
}

export default RecipeGrid;