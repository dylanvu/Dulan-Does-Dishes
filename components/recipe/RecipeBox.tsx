// renders a nice looking box with the recipe steps and ingredients and info

import styles from "../../styles/recipe/RecipeBox.module.css";
import titleStyles from "../../styles/common/title.module.css";
import { Checkbox, OrderedList, VStack, ListItem, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Box } from "@chakra-ui/react";
import { RecipeBox } from "../../interfaces/components/recipe";
import { createRecipeURL } from "../utils/id";
import { useEffect, useState } from "react";
import { Tag, TagLabel, HStack, Center } from "@chakra-ui/react";
import { Tag as TagInterface } from "../../interfaces/data/tag";
import RecipeCard from "../common/RecipeCard";


const RecipeBox = ({ name, ingredients, steps, background, postCooking, rating, img, previewURL, tags }: RecipeBox) => {
    useEffect(() => {
        if (name === undefined || name === null || name.length > 0) {
            changeUrl("");
        } else {
            const recipeURL = createRecipeURL(name);
            if (previewURL) {
                changeUrl(window.location.href + "/" + recipeURL);
            } else {
                changeUrl(recipeURL);
            }
        }
    }, [name]);

    useEffect(() => {
        // convert from a map to an array to iterate through
        const tagArrayFromRecord: TagInterface[] = [];
        for (const tag in tags) {
            tagArrayFromRecord.push(tags[tag]);
        }
        changeTagArray([...tagArrayFromRecord]);

    }, [tags]);

    const [tagArray, changeTagArray] = useState<TagInterface[]>([])

    const [url, changeUrl] = useState("");

    return (
        <div className={styles["main-recipe-box"]}>
            {previewURL ?
                <h1 className={titleStyles["generic-title"]}>{url}</h1>
                :
                null
            }

            <h1 className={titleStyles["generic-title"]}>{name && name.length === 0 || name === undefined ? "Untitled Dish" : name}</h1>
            {img && img.length > 0 ? <RecipeCard card={{ img: img, title: name, url: url }} size="large" tilt={"right"} titleInvisible={true} visible={true} /> : null}

            <h1 className={titleStyles["generic-h1"]}>Ingredients</h1>
            <div className={styles["recipe-list-wrapper"]}>
                {(ingredients && ingredients.length === 0) || ingredients == undefined || ingredients.at(0)?.length === 0 ? "No ingredients specified yet!" :
                    <VStack align="start">
                        {ingredients.map((ingredient, index) => {
                            return (
                                <Checkbox key={`${name}-ingredient-${index}-recipe-box`} colorScheme="teal" borderColor="#9D9D9D">
                                    {ingredient}
                                </Checkbox>
                            )
                        })}
                    </VStack>
                }
            </div>

            <h1 className={titleStyles["generic-h1"]}>Steps</h1>
            <div className={styles["recipe-list-wrapper"]}>
                {steps === null || steps === undefined || steps.length === 0 || steps.at(0)?.length === 0 ? "No steps specified yet!" :
                    <VStack align="start" justify="left">
                        <OrderedList spacing="0.5em">
                            {steps.map((step, index) => {
                                return (
                                    <ListItem key={`${name}-step-${index}-recipe-box`}>
                                        {step}
                                    </ListItem>
                                )
                            })}
                        </OrderedList>
                    </VStack>
                }
            </div>

            {/* Rating */}
            {rating === null || rating === undefined || rating.length === 0 ? null :
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
                    {background === null || background === undefined || background.length === 0 ? null :
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
                    {postCooking === null || postCooking === undefined || postCooking.length === 0 ? null :
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

            {tags === null || tags === undefined || tagArray.length === 0 ? null :
                <div className={styles["tags-wrapper"]}>
                    <h1 className={titleStyles["generic-h1"]}>Tags</h1>
                    <HStack align="center" justify="center" spacing={4}>
                        {
                            tagArray.map((tag) => {
                                return (
                                    <Center key={tag.name + tag.color + "-recipe-box"}>
                                        <Tag backgroundColor={tag.color}>
                                            <TagLabel>
                                                {tag.name}
                                            </TagLabel>
                                        </Tag>
                                    </Center>
                                )
                            })
                        }
                    </HStack>
                </div>
            }
        </div>
    )
}

export default RecipeBox;