import type { NextPage } from 'next';
import Head from 'next/head'
import styles from "../../styles/recipe/NewRecipe.module.css";
import inputStyles from "../../styles/common/input.module.css";
import titleStyles from "../../styles/common/title.module.css";
import RecipeForm from '../../components/recipe/RecipeForm';

import TextAreaInput from '../../components/common/textAreaInput';

import { useState, MouseEventHandler } from 'react';

const NewRecipe: NextPage = () => {
    const [recipeName, changeRecipeName] = useState("");
    const [recipeSteps, changeRecipeSteps] = useState<string[]>([]);
    const [ingredientsList, changeIngredientsList] = useState<string[]>([]);
    const [background, changeBackground] = useState("");
    const [postCooking, changePostCooking] = useState("");
    const [rating, changeRating] = useState("");

    const uploadRecipe: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        // do some validation:
        // if any of the list steps are blank, remove the blank entries
        // if there is no image, yell at the user.

        console.log("Uploading Recipe to database");
    }

    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                <meta name="description" content="Cooking" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main} id="main">
                <input placeholder={`My amazing dish...`} className={inputStyles["generic-input"]} onChange={(e) => {
                    e.preventDefault();
                    changeRecipeName(e.target.value.trim());
                }} ></input>
                <RecipeForm title="Ingredients" numbered={false} changeListState={changeIngredientsList} />
                <RecipeForm title="Steps" numbered={true} changeListState={changeRecipeSteps} />
                {/* background/other information in a free text box */}
                <TextAreaInput title="Background" placeholder="What's the background? Who or what inspired you? Why did you make this?" changeTextAreaState={changeBackground} />
                <TextAreaInput title="Post-Cooking Remarks" placeholder="What happened during or after cooking? Any other random information?" changeTextAreaState={changePostCooking} />

                {/* rating comments/thoughts on the dish */}
                <TextAreaInput title="Rating" placeholder="What did you think of the dish?" changeTextAreaState={changeRating} />


                {/* main image upload for the dish */}
                <h1 className={titleStyles["generic-h1"]}>Upload Photo</h1>
                <label htmlFor="img" />
                <input type="file" id="img" name="img" accept="image/*" multiple />


                {/* preview of the main recipe mini box */}
                <h1 className={titleStyles["generic-h1"]}>Preview</h1>


                {/* submit/finalize button */}
                <button onClick={uploadRecipe} className={inputStyles["generic-btn"]}>Done!</button>
            </main>
        </div>
    )
}

export default NewRecipe;