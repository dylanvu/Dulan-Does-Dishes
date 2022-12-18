// renders a nice looking box with the recipe steps and ingredients and info

import styles from "../../styles/recipe/RecipeBox.module.css";
import titleStyles from "../../styles/common/title.module.css";
import { Checkbox, OrderedList, VStack, ListItem, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Box } from "@chakra-ui/react";
import { RecipeBox } from "../../interfaces/recipe";
import { createRecipeURL } from "../utils/id";
import { useEffect, useState } from "react";

const RecipeBox = ({ title, ingredients, steps, background, postCooking, rating, img, previewURL, tags }: RecipeBox) => {
    useEffect(() => {
        changeUrl(window.location.href + "/" + createRecipeURL(title));
        console.log(background);
        console.log(background?.length)
    }, [title]);

    const [url, changeUrl] = useState("");

    return (
        <div className={styles["main-recipe-box"]}>
            {previewURL ?
                <h1 className={titleStyles["generic-title"]}>{url}</h1> : null}

            <h1 className={titleStyles["generic-title"]}>{title.length === 0 ? "Untitled Dish" : title}</h1>
            <h1 className={titleStyles["generic-h1"]}>Ingredients</h1>
            <div className={styles["recipe-list-wrapper"]}>
                {ingredients.length === 0 || ingredients.at(0)?.length === 0 ? "No ingredients specified yet!" :
                    <VStack align="start">
                        {ingredients.map((ingredient, index) => {
                            return (
                                <Checkbox key={`${title}-ingredient-${index}`} colorScheme="teal" borderColor="#9D9D9D">
                                    {ingredient}
                                </Checkbox>
                            )
                        })}
                    </VStack>
                }



            </div>


            <h1 className={titleStyles["generic-h1"]}>Steps</h1>
            <div className={styles["recipe-list-wrapper"]}>
                {steps === null || steps.length === 0 || steps.at(0)?.length === 0 ? "No steps specified yet!" :
                    <VStack align="start" justify="left">
                        <OrderedList spacing="0.5em">
                            {steps.map((step, index) => {
                                return (
                                    <ListItem key={`${title}-step-${index}`}>
                                        {step}
                                    </ListItem>
                                )
                            })}
                        </OrderedList>
                    </VStack>
                }






            </div>

            {/* Rating */}
            {rating === null || rating.length === 0 ? null :
                <div>
                    <h1 className={titleStyles["generic-h1"]}>Rating</h1>
                    <div className={styles["rating-text-box"]}>
                        {rating}
                    </div>
                </div>
            }

            <div className={styles["accordion-wrapper"]}>
                <Accordion allowToggle allowMultiple={true} >
                    {/* Background */}
                    {background === null || background.length === 0 ? null :
                        <AccordionItem borderColor="#9D9D9D">
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <div>
                                        <h1 className={titleStyles["generic-h1"]}>
                                            Background
                                        </h1>
                                    </div>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                                <div className={styles["recipe-box-text-block"]}>
                                    {background}
                                </div>
                            </AccordionPanel >
                        </AccordionItem>
                    }
                    {/* Post-cooking Remarks */}
                    {postCooking === null || postCooking.length === 0 ? null :
                        <AccordionItem borderColor="#9D9D9D">
                            <AccordionButton>
                                <Box w="10%" as="span" flex='1' textAlign='left'>
                                    <div className={styles["accordion-title-wrapper"]}>
                                        <h1 className={titleStyles["generic-h1"]}>
                                            Post-Cooking Remarks
                                        </h1>
                                    </div>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel className={styles["recipe-box-text-block"]}>
                                <div className={styles["recipe-box-text-block"]}>
                                    {postCooking}
                                </div>
                            </AccordionPanel >
                        </AccordionItem>
                    }
                </Accordion>
            </div>
        </div>
    )
}

export default RecipeBox;