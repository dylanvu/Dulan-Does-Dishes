import type { NextPage } from 'next';
import Head from 'next/head'
import styles from "../../styles/recipe/NewRecipe.module.css";
import inputStyles from "../../styles/common/input.module.css";
import titleStyles from "../../styles/common/title.module.css";
import RecipeForm from '../../components/recipe/RecipeForm';
import { useToast, UseToastOptions, CircularProgress, Progress } from '@chakra-ui/react';

import TextAreaInput from '../../components/common/textAreaInput';

import { useState, MouseEventHandler } from 'react';
import RecipeBox from '../../components/recipe/RecipeBox';

const NewRecipe: NextPage = () => {
    const [recipeName, changeRecipeName] = useState("");
    const [recipeSteps, changeRecipeSteps] = useState<string[]>([]);
    const [ingredientsList, changeIngredientsList] = useState<string[]>([]);
    const [background, changeBackground] = useState("");
    const [postCooking, changePostCooking] = useState("");
    const [rating, changeRating] = useState("");

    const [uploadState, changeUploadState] = useState<"uploading" | "success" | "idle" | "api-error">("idle");

    const toast = useToast();

    const uploadRecipe: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        let genericErrorToast: UseToastOptions = {
            description: "testing",
            status: "error",
            duration: 9000,
            isClosable: true,
            variant: "subtle",
            position: "bottom-left"
        }

        toast.closeAll();

        // do some validation:
        // if the title is blank, yell at the user
        let isValid = true;
        if (recipeName.length === 0) {
            genericErrorToast.description = "Recipe name is blank."
            toast(genericErrorToast);
            isValid = false;
        }

        // if the steps or ingredients are all blank, yell at the user
        for (const ingredient of ingredientsList) {
            if (ingredient.length === 0) {
                genericErrorToast.description = "No ingredients were added."
                toast(genericErrorToast);
                isValid = false;
            }
        }

        for (const step of recipeSteps) {
            if (step.length === 0) {
                genericErrorToast.description = "No steps were added."
                toast(genericErrorToast);
                isValid = false;
            }
        }

        // if there is no image, yell at the user.

        // if any of the list steps are blank, remove the blank entries

        // warn user if background, rating, and post cooking is blank

        if (isValid) {
            console.log("Added recipe to database");
            changeUploadState("uploading");
            // api call
            // on .catch, changeUploadState to be "api-error"
            // on a .then, changeUploadState to be "success"
        } else {
            console.error("One or more errors were found.");
        }
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
                <h1 className={titleStyles["generic-h1"]}>Preview Recipe</h1>
                <RecipeBox title={recipeName} ingredients={ingredientsList} steps={recipeSteps} background={background} postCooking={postCooking} rating={rating} photo="THIS IS A PLACEHOLDER IN NEW.TSX" />

                {/* submit/finalize button */}
                <div className={styles["finalize-wrapper"]}>
                    {uploadState === "idle" ? <button onClick={uploadRecipe} className={inputStyles["generic-btn"]}>Done!</button> : null}
                    {uploadState === "uploading" ? <CircularProgress isIndeterminate color="#79B4B7" /> : null}
                    {uploadState === "api-error" ? <Progress value={100} hasStripe colorScheme="red" /> : null}
                    {uploadState === "success" ? <Progress value={100} colorScheme="green" /> : null}
                </div>

                <div>
                    Placeholder
                </div>

            </main>
        </div>
    )
}

export default NewRecipe;