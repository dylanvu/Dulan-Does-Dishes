import RecipeCard from './RecipeCard';
import styles from "../../styles/home/RecipeGrid.module.css";

interface RecipeGrid {
    recipes: RecipeCard[];
}

const RecipeGrid = (props: RecipeGrid) => {

    return (
        <div className={styles["recipe-grid-container"]}>
            <div className={styles["recipe-flex-grid"]}>
                {props.recipes.map((recipe) => {
                    // console.log(`Creating ${recipe.title}`);
                    return (
                        <RecipeCard img={recipe.img} title={recipe.title} key={recipe.title} />
                    )
                })}
            </div>
        </div>

    )
}

export default RecipeGrid;