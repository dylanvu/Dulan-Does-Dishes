// renders a nice looking box with the recipe steps and ingredients and info

import styles from "../../styles/recipe/RecipeBox.module.css";
import titleStyles from "../../styles/common/title.module.css";

const RecipeBox = ({ title, ingredients, steps, background, postCooking, rating, photo }: { title: string, ingredients: string[], steps: string[], background: string, postCooking: string, rating: string, photo: string }) => {
    return (
        <div className={styles["main-recipe-box"]}>
            <h1 className={titleStyles["generic-title"]}>{title.length === 0 ? "No title specified!!!" : title}</h1>

            <h1 className={titleStyles["generic-h1"]}>Ingredients</h1>
            <div>
                {ingredients.length === 0 || ingredients.at(0)?.length === 0 ? "No ingredients specified yet!" : ingredients.map((ingredient, index) => {
                    return (
                        <div key={`${title}-ingredient-${index}`}>
                            {ingredient}
                        </div>
                    )
                })}
            </div>

            <h1 className={titleStyles["generic-h1"]}>Steps</h1>
            <div>
                {steps.length === 0 || steps.at(0)?.length === 0 ? "No steps specified yet!" : steps.map((step, index) => {
                    return (
                        <div key={`${title}-step-${index}`}>
                            {step}
                        </div>
                    )
                })}
            </div>

            {/* Rating */}
            {rating.length === 0 ? null : <div>
                <h1 className={titleStyles["generic-h1"]}>Rating</h1>
                <div>
                    {rating}
                </div>
            </div>
            }


            {/* Collapsible box */}
            {/* Background */}
            {background.length === 0 ? null : <div>
                <h1 className={titleStyles["generic-h1"]}>Background</h1>
                <div>
                    {background}
                </div>
            </div>
            }

            {/* Post-cooking Remarks */}
            {postCooking.length === 0 ? null : <div>
                <h1 className={titleStyles["generic-h1"]}>Post-Cooking Remarks</h1>
                <div>
                    {postCooking}
                </div>
            </div>
            }

        </div>
    )
}

export default RecipeBox;