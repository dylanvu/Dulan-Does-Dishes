
import styles from "../../styles/home/RecipeBlock.module.css";
import RecipeCard from "../common/RecipeCard";
import { RecipeCard as RecipeCardInterface } from "../../interfaces/components/recipe";

const RecipeBlock = ({ imgLeft, card, tilt }: { imgLeft?: boolean, card: RecipeCardInterface, tilt?: "left" | "right" }) => {
    const sample = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n\nThe point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
    return (
        <div className={`${styles["recipe-block"]} ${tilt ? styles[`tilt-${tilt}`] : null}`}>
            <div className={styles["recipe-block-text-container"]}>
                <div className={styles["recipe-block-text"]}>
                    {sample}
                </div>
                <div className={styles["see-recipe-container"]}>
                    <a>
                        See the Recipe!
                    </a>
                    {/* <span>
                        See the Recipe Here! &nbsp;
                    </span>
                    <span>
                        <Image className={styles["arrow-icon"]} src={rightArrow} layout="fixed" width={iconSize} height={iconSize} />
                    </span> */}
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