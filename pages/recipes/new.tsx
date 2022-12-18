import type { NextPage } from 'next';
import Head from 'next/head';
import styles from "../../styles/recipe/NewRecipe.module.css";
import inputStyles from "../../styles/common/input.module.css";
import titleStyles from "../../styles/common/title.module.css";
import RecipeForm from '../../components/recipe/RecipeForm';
import { Button, useToast, UseToastOptions, CircularProgress, Progress, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { uploadRecipe } from '../../services/api/upload';

import TextAreaInput from '../../components/common/textAreaInput';

import { useState, MouseEventHandler, useRef } from 'react';
import RecipeBox from '../../components/recipe/RecipeBox';

import { tag } from "../../interfaces/recipe";

const NewRecipe: NextPage = () => {
    const [recipeName, changeRecipeName] = useState("");
    const [recipeSteps, changeRecipeSteps] = useState<string[]>([]);
    const [ingredientsList, changeIngredientsList] = useState<string[]>([]);
    const [background, changeBackground] = useState("");
    const [postCooking, changePostCooking] = useState("");
    const [rating, changeRating] = useState("");

    const [uploadState, changeUploadState] = useState<"uploading" | "success" | "idle" | "api-error">("idle");

    const [tags, changeTags] = useState<tag[]>([]);

    const [warnState, changeWarnState] = useState(false);

    const cancelRef = useRef<any>();

    const toast = useToast();

    const handleUpload = () => {
        // TODO: Remember to create a function to build a recipe object
        // verification has been done already
        changeUploadState("uploading");
        // uploadRecipe()
        //     .then(() =>
        //         changeUploadState("success")
        //     ).catch(() =>
        //         changeUploadState("api-error")
        //     );
    }

    const generateToast = (description: string, toastOptions: UseToastOptions): boolean => {
        toastOptions.description = description;
        toast(toastOptions);
        return false;
    }

    const handleRecipeSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        let genericErrorToast: UseToastOptions = {
            description: "testing",
            status: "error",
            duration: 9000,
            isClosable: true,
            variant: "subtle",
            position: "bottom-left"
        }

        let genericWarningToast: UseToastOptions = {
            description: "testing",
            status: "warning",
            duration: 9000,
            isClosable: true,
            variant: "subtle",
            position: "bottom-left"
        }

        toast.closeAll();

        // do some validation:
        // if the title is blank, yell at the user
        let isValid = true;
        let noWarning = true;
        if (recipeName.length === 0) {
            isValid = generateToast("Recipe name is blank.", genericErrorToast);
        }

        // if the steps or ingredients are all blank, yell at the user
        for (const ingredient of ingredientsList) {
            if (ingredient.length === 0) {
                isValid = generateToast("No ingredients were added.", genericErrorToast);
            }
        }

        for (const step of recipeSteps) {
            if (step.length === 0) {
                isValid = generateToast("No steps were added.", genericErrorToast);
            }
        }

        // if there is no image, yell at the user.

        // if any of the list steps are blank, remove the blank entries

        // warn user if background, rating, post cooking, and tags are blank
        if (background.length === 0) {
            noWarning = generateToast("Background is blank.", genericWarningToast);
        }

        if (rating.length === 0) {
            noWarning = generateToast("Rating is blank.", genericWarningToast);
        }

        if (postCooking.length === 0) {
            noWarning = generateToast("Post Cooking is blank.", genericWarningToast);
        }

        if (tags.length === 0) {
            noWarning = generateToast("No tags specified.", genericWarningToast);
        }

        if (isValid) {
            if (noWarning) {
                // proceed with the upload
                handleUpload();
            } else {
                // show a warning/finalization confirm warmup
                changeWarnState(true);
            }
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
                <h1 className={titleStyles["generic-h1"]}>Dish Name</h1>
                <input placeholder={`My amazing dish...`} className={inputStyles["generic-input"]} onChange={(e) => {
                    e.preventDefault();
                    changeRecipeName(e.target.value.trim());
                }} />
                <RecipeForm title="Ingredients" numbered={false} changeListState={changeIngredientsList} />
                <RecipeForm title="Steps" numbered={true} changeListState={changeRecipeSteps} />
                {/* background/other information in a free text box */}
                {/* rating comments/thoughts on the dish */}
                <TextAreaInput title="Rating" placeholder="What did you think of the dish?" changeTextAreaState={changeRating} />
                <TextAreaInput title="Background" placeholder="What's the background? Who or what inspired you? Why did you make this?" changeTextAreaState={changeBackground} />
                <TextAreaInput title="Post-Cooking Remarks" placeholder="What happened during or after cooking? Any other random information?" changeTextAreaState={changePostCooking} />

                {/* Recipe tags */}
                <h1 className={titleStyles["generic-h1"]}>Tags</h1>



                {/* main image upload for the dish */}
                <h1 className={titleStyles["generic-h1"]}>Upload Photo</h1>
                <label htmlFor="img" />
                <input type="file" id="img" name="img" accept="image/*" multiple />


                {/* preview of the main recipe mini box */}
                <h1 className={titleStyles["generic-h1"]}>Preview Recipe</h1>
                <RecipeBox title={recipeName} ingredients={ingredientsList} steps={recipeSteps} background={background} postCooking={postCooking} rating={rating} img="THIS IS A PLACEHOLDER IN NEW.TSX" tags={tags} url={recipeName} previewURL={true} />

                {/* submit/finalize button */}
                <div className={styles["finalize-wrapper"]}>
                    {uploadState === "idle" ? <button onClick={handleRecipeSubmit} className={inputStyles["generic-btn"]}>Done!</button> : null}
                    {uploadState === "uploading" ? <CircularProgress isIndeterminate color="#79B4B7" /> : null}
                    {uploadState === "api-error" ? <Progress value={100} hasStripe colorScheme="red" /> : null}
                    {uploadState === "success" ? <Progress value={100} colorScheme="green" /> : null}
                </div>
                <AlertDialog
                    isOpen={warnState}
                    leastDestructiveRef={cancelRef}
                    onClose={() => { }}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Upload Recipe
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                One or more optional fields are blank. Are you sure you want to continue?
                                {/* // TODO Create an array of blank fields. */}
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} colorScheme='red' onClick={() => {
                                    console.log("Cancelled upload");
                                    changeWarnState(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button colorScheme='teal' onClick={() => {
                                    console.log("Starting upload anyways");
                                    changeWarnState(false);
                                    handleUpload();
                                }}
                                    ml={3}>
                                    Get that Bread!
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </main>
        </div>
    )
}

export default NewRecipe;