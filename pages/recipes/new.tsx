import type { NextPage } from 'next';
import Head from 'next/head';
import styles from "../../styles/recipe/NewRecipe.module.css";
import inputStyles from "../../styles/common/input.module.css";
import titleStyles from "../../styles/common/title.module.css";
import RecipeForm from '../../components/recipe/RecipeForm';
import { Button, useToast, UseToastOptions, CircularProgress, Progress } from '@chakra-ui/react';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import { HStack, Center } from '@chakra-ui/react';
import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { getTodayDate, getTodayLocal } from '../../components/utils/date';
import { createRecipe } from '../../services/api/recipe';
import { getAllTags, createTag } from '../../services/api/tag';
import { Recipe } from '../../interfaces/data/recipe';

import TextAreaInput from '../../components/common/textAreaInput';

import { useState, MouseEventHandler, useRef, useEffect, ChangeEventHandler, useContext } from 'react';
import RecipeBox from '../../components/recipe/RecipeBox';

import { Tag as TagInterface } from "../../interfaces/data/tag";
import { tagButton } from '../../interfaces/components/tag';
import { createRecipeURL } from '../../components/utils/id';

import { jwtContext } from '../_app';

const NewRecipe: NextPage = () => {
    const [recipeName, changeRecipeName] = useState("");
    const [recipeSteps, changeRecipeSteps] = useState<string[]>([]);
    const [ingredientsList, changeIngredientsList] = useState<string[]>([]);
    const [background, changeBackground] = useState("");
    const [postCooking, changePostCooking] = useState("");
    const [rating, changeRating] = useState("");

    /**
     * Photo of food item
     */
    const [pictures, changePictures] = useState<string[]>([]);

    /**
     * State to hold the value of the new tag
     */
    const [newTag, changeNewTag] = useState("");

    /**
     * State to hold the HEX color of the new tag
     */
    const [newTagColor, changeNewTagColor] = useState("");

    const [uploadState, changeUploadState] = useState<"uploading" | "success" | "idle" | "api-error">("idle");

    /**
     * All possible tags for a recipe
     */
    const [tags, changeTags] = useState<tagButton[]>([]);

    /**
     * All selected tags for a recipe
     */
    const [selectedTagsMap, changeSelectedTagsMap] = useState<Record<string, TagInterface>>({});

    const [warnState, changeWarnState] = useState(false);

    const cancelRef = useRef<any>();

    const toast = useToast();

    const jwt = useContext(jwtContext);

    /**
     * Control the size of tags
     */
    const unselectedTagSize = "sm";
    const selectedTagSize = "md";

    useEffect(() => {
        getAllTags().then((tags) => {
            if (tags) {
                // convert each tag to a tag button
                // make everything small size for default and make larger when selected
                const tagButtons: tagButton[] = tags.map((tag) => {
                    return { ...tag, size: unselectedTagSize }
                });
                console.log(tagButtons)
                changeTags(tagButtons);
            } else {
                console.error("all tags returned null")
            }
        });
    }, []);

    useEffect(() => {
        // when the selected tags are updated, filter out all the buttons that are large and add them to the new array
        const selectedTags = tags.filter((tag) => {
            return tag.size === selectedTagSize;
        });
        const tagMap: Record<string, TagInterface> = {};
        for (const tag of selectedTags) {
            const tagCopy = { ...tag } as TagInterface;
            if ("size" in tagCopy) {
                delete tagCopy["size"];
            }
            tagMap[tag.name] = tagCopy;
        }
        changeSelectedTagsMap(tagMap);
    }, [tags]);

    const handleUpload = () => {

        // if any of the list steps are blank, remove the blank entries
        const ingredentsCopy = ingredientsList;
        const stepsCopy = recipeSteps;
        const filteredIngredients = ingredentsCopy.filter((ingredient) => ingredient.length > 0);
        const filteredSteps = stepsCopy.filter((step) => step.length > 0);

        const newRecipe: Recipe = {
            name: recipeName,
            img: pictures[0],
            url: createRecipeURL(recipeName),
            ingredients: filteredIngredients,
            steps: filteredSteps,
            rating: rating,
            background: background,
            postCooking: postCooking,
            tags: selectedTagsMap,
            date: getTodayDate()
        }
        // verification has been done already
        changeUploadState("uploading");
        if (jwt) {
            createRecipe(newRecipe, jwt.jwt).then(() => {
                changeUploadState("success");
                console.log("success")

            }
            ).catch(() => {
                changeUploadState("api-error");
                console.log("api error")
            }
            );
        } else {
            console.error("Clientside: missing jwt");
        }

    }

    const generateToast = (description: string, toastType: "warn" | "error"): boolean => {

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

        let toastOption: UseToastOptions;

        if (toastType === "warn") {
            toastOption = genericWarningToast;
        } else {
            toastOption = genericErrorToast;
        }

        toastOption.description = description;
        toast(toastOption);
        return false;
    }

    const previewImage: ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        if (files) {
            const file = files[0];
            const reader = new FileReader();
            // reader.onloadend = () => {
            //     const comp = lzma.compress(reader.result as string);
            //     changePictures([comp]);
            // }
            reader.onloadend = () => {
                changePictures([reader.result as string]);
            }
            reader.readAsDataURL(file);
            // for (let i = 0; i < file.length; i++) {
            //     const fileItem = file.item(i);
            //     if (fileItem) {
            //         const picCopy = pictures;
            //         // reader.readAsDataURL(fileItem);
            //         const picURL = URL.createObjectURL(fileItem);
            //         console.log(picURL);
            //         changePictures([...picCopy, picURL]);
            //     }
            // }

        } else {
            changePictures([]);
        }
    }

    const submitNewTag = () => {
        // sanitize the inputs
        let isValidTag = true;
        if (newTag.length === 0) {
            isValidTag = false;
            generateToast("Invalid tag name", "error");
        }
        if (newTagColor.length === 0) {
            isValidTag = false;
            generateToast("Invalid tag color value", "error");
        }

        if (isValidTag) {
            const newTagObj: TagInterface = {
                name: newTag,
                color: newTagColor
            }
            if (jwt) {
                createTag(newTagObj, jwt.jwt).then(() => {
                    // TODO: update the tags state by calling the api again but also preserving the state of clicked tags already 
                    changeTags([...tags, { name: newTag, color: newTagColor, size: unselectedTagSize }]);

                    // reset the states to be blank
                    changeNewTag("");
                    changeNewTagColor("#FFFFFF");
                })
            } else {
                console.error("Clientside error: missing JWT");
            }

        } else {
            generateToast("One or more tag options were invalid. No tag was added.", "error");
        }


    }

    const handleRecipeSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        toast.closeAll();

        // do some validation:
        // if the title is blank, yell at the user
        let isValid = true;
        let noWarning = true;
        if (recipeName.length === 0) {
            isValid = generateToast("Recipe name is blank.", "error");
        }

        // if the steps or ingredients are all blank, yell at the user
        if (ingredientsList.length === 0) {
            isValid = generateToast("No ingredients were added.", "error");
        }

        for (const ingredient of ingredientsList) {
            if (ingredient.length === 0) {
                isValid = generateToast("An ingredient was left blank.", "error");
            }
        }

        if (recipeSteps.length === 0) {
            isValid = generateToast("No steps were added.", "error");
        }
        for (const step of recipeSteps) {
            if (step.length === 0) {
                isValid = generateToast("A step was left blank", "error");
            }
        }


        // if there is no image, yell at the user.
        // TODO: Handle image verification
        if (previewImage.length === 0) {
            isValid = generateToast("No image was uploaded!", "error");
        }

        // warn user if background, rating, post cooking, and tags are blank
        if (background.length === 0) {
            noWarning = generateToast("Background is blank.", "warn");
        }

        if (rating.length === 0) {
            noWarning = generateToast("Rating is blank.", "warn");
        }

        if (postCooking.length === 0) {
            noWarning = generateToast("Post Cooking is blank.", "warn");
        }

        // check if any tags are selected
        // these will be the tags sent to the backend database
        const allSelectTags: TagInterface[] = [];
        for (const tag of tags) {
            if (tag.size === selectedTagSize) {
                allSelectTags.push({ name: tag.name, color: tag.color })
            }
        }

        if (allSelectTags.length === 0) {
            noWarning = generateToast("No tags specified.", "warn");
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

    const handleColorChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        changeNewTagColor(e.target.value)
    }

    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                <meta name="description" content="Cooking" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
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
                <h1 className={titleStyles["generic-h1"]}>Available Tags</h1>
                <HStack align="center" justify="center" spacing={4}>
                    {
                        tags.length > 0 ?
                            tags.map((tag, index) => {
                                return (
                                    <Center key={tag.name + tag.color + "-new"}>
                                        <Tag cursor="pointer" backgroundColor={tag.color} size={tag.size} onClick={() => {
                                            let tagsCopy = tags;
                                            if (tag.size === unselectedTagSize) {
                                                // make larger when clicked
                                                tagsCopy[index] = { ...tagsCopy[index], size: selectedTagSize }
                                            } else {
                                                tagsCopy[index] = { ...tagsCopy[index], size: unselectedTagSize }
                                            }

                                            // add this modified tag back into the array of buttons
                                            changeTags([...tagsCopy]);
                                        }}>
                                            <TagLabel>
                                                {tag.name}
                                            </TagLabel>
                                            {tag.size === unselectedTagSize ? null : <TagCloseButton />}
                                        </Tag>
                                    </Center>
                                )
                            })
                            :
                            <div>
                                No tags created yet!
                            </div>
                    }

                </HStack>

                <h1 className={titleStyles["generic-h1"]}>Create/Edit Tag</h1>
                <input type="color" id="tag-color-input" className={styles["color-input"]} onChange={handleColorChange} />&nbsp;
                <input placeholder={`My new tag name...`} className={inputStyles["generic-input"]} value={newTag} onChange={(e) => {
                    e.preventDefault();
                    changeNewTag(e.target.value.toUpperCase().trim());
                }} /> &nbsp;
                {newTag.length > 0 ? <button className={inputStyles["generic-btn"]} style={{ backgroundColor: newTagColor }} onClick={submitNewTag}>Create <b>{newTag}</b> tag</button> : null}



                {/* main image upload for the dish */}
                <h1 className={titleStyles["generic-h1"]}>Upload Photo</h1>
                <label htmlFor="img" />
                <input type="file" id="img" name="img" accept="image/*" multiple onChange={(e) => {
                    previewImage(e);
                }} />

                {/* preview of the main recipe mini box */}
                <h1 className={titleStyles["generic-h1"]}>Preview Recipe</h1>
                <RecipeBox date={getTodayLocal()} name={recipeName} ingredients={ingredientsList} steps={recipeSteps} background={background} postCooking={postCooking} rating={rating} img={pictures.length > 0 ? pictures[0] : ""} tags={selectedTagsMap} url={recipeName} previewURL={true} />

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