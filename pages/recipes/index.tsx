import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/recipe/index.module.css';
import RecipeGrid from '../../components/recipe/RecipeGrid';
import titleStyles from "../../styles/common/title.module.css";
import { useEffect, useState, ChangeEventHandler } from 'react';
import { RecipeCard as RecipeCardInterface } from '../../interfaces/components/recipe';
import { CircularProgress } from '@chakra-ui/react';
import { getAllRecipes } from '../../services/api/recipe';
import { getAllTags } from '../../services/api/tag';

import { checkName } from '../../components/utils/name';

import { Flex, Center } from '@chakra-ui/react';
import { Tag, TagLabel, TagCloseButton, RadioGroup, Radio } from '@chakra-ui/react'
import { Input, Accordion, AccordionItem, AccordionIcon, AccordionButton, Box, AccordionPanel } from '@chakra-ui/react';

import { Recipe } from '../../interfaces/data/recipe';
import { tagButton } from '../../interfaces/components/tag';

const Recipes: NextPage = () => {

  /**
   * The value in the search field
   */
  const [searchField, changeSearchField] = useState("");

  const [searchFieldStyle, changeSearchFieldStyle] = useState<"outline" | "filled">("outline");

  const [pageState, changePageState] = useState<"idle" | "loading" | "error">("idle");

  /**
   * All recipes in the database, rendered as cards
   */
  const [recipes, changeRecipes] = useState<Recipe[]>([]);

  const [filteredRecipes, changeFilteredRecipes] = useState<RecipeCardInterface[]>([]);

  /**
   * All available tags to be selected for filtering
   */
  const [allTags, changeAllTags] = useState<tagButton[]>([]);

  /**
   * For selecting between all or one tag matching
   */
  const [filterOption, setFilterOption] = useState<"all" | "one">("all");

  const handleRadioChange = (option: "all" | "one") => {
    setFilterOption(option);
  }

  /**
 * Tags that are currently selected
 */
  const [selectedTags, setSelectedTags] = useState<tagButton[]>([]);

  /**
 * Control the size of tags
 */
  const unselectedTagSize = "sm";
  const selectedTagSize = "md";

  useEffect(() => {
    // change search bar style if it is filled or not
    changeSearchFieldStyle(searchField.length > 0 ? "filled" : "outline")
  }, [searchField]);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    changeSearchField(event.target.value.trim())
  }

  useEffect(() => {
    changePageState("loading");
    getAllRecipes().then((res) => {
      if (res) {
        const recipeCardArray: RecipeCardInterface[] = res.map((recipe) => {
          return { ...recipe, title: recipe.name }
        })
        changeRecipes(res);
        changeFilteredRecipes(recipeCardArray);
        changePageState("idle");
      } else {
        changePageState("error");
      }
    }).catch((e) => {
      console.error(e);
    });

    // get all tags
    getAllTags().then((tags) => {
      if (tags) {
        const tagButtons: tagButton[] = tags.map((tag) => {
          return {
            name: tag.name,
            color: tag.color,
            size: unselectedTagSize
          }
        })
        changeAllTags(tagButtons);
      }
    })
  }, []);

  // refilter based on when filter options or selected tags change
  useEffect(() => {
    if (selectedTags.length > 0 && recipes.length > 0) {
      // filter out recipes based on the option and the selected tags
      let filtered: RecipeCardInterface[] = [];
      if (filterOption === "all") {
        filtered = recipes.filter((recipe) => {
          // check name
          if (!checkName(recipe.name, searchField)) {
            return false;
          }
          let isSatisfied = true;
          // iterate through all selected tags and see if all tags selected are included
          for (const tag of selectedTags) {
            let tagName = tag.name;
            if (!recipe.tags[tagName]) {
              isSatisfied = false;
              break;
            }
          }
          return isSatisfied;
        });
      } else if (filterOption === "one") {
        // check for presence of one tag
        filtered = recipes.filter((recipe) => {
          let isSatisfied = false;
          // iterate through all selected tags and see if at least one tag selected is included
          for (const tag of selectedTags) {
            if (!checkName(recipe.name, searchField)) {
              return false;
            }
            let tagName = tag.name;
            if (recipe.tags[tagName]) {
              isSatisfied = true;
              break;
            }
          }
          return isSatisfied;
        });
      }
      changeFilteredRecipes(filtered);
    } else if (searchField.length > 0 && selectedTags.length === 0) {
      // only filter by name
      let filtered: RecipeCardInterface[] = recipes.filter((recipe) => {
        return checkName(recipe.name, searchField)
      })
      changeFilteredRecipes(filtered);
    } else {
      // reset back to all recipes no filter
      const recipeCardArray: RecipeCardInterface[] = recipes.map((recipe) => {
        return { ...recipe, title: recipe.name }
      })
      changeFilteredRecipes(recipeCardArray);
    }
  }, [filterOption, selectedTags, searchField]);

  useEffect(() => {
    // when all tags change, filter out all selected tags
    const allSelectedTags = allTags.filter((tag) => {
      return tag.size === selectedTagSize;
    });
    setSelectedTags(allSelectedTags);
  }, [allTags])

  return (
    <div>
      <Head>
        <title>Dulan Does Dishes</title>
        <meta name="description" content="Cooking, Life Stories, and more!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
      </Head>

      <main id="main" className={styles["main"]}>
        <div className={styles["search-container"]}>
          <div className={styles["search-bar"]}>
            {/* Search field */}
            <Input variant={searchFieldStyle} placeholder='Search for a dish...' colorScheme="teal" focusBorderColor='#79B4B7' onChange={handleSearchChange} />
          </div>
          <div className={styles["filter-container"]}>
            <Accordion allowToggle>
              <AccordionItem borderColor="#9D9D9D">
                <AccordionButton _expanded={{ bg: '#79B4B7', color: '#FEFBF3' }}>
                  <Box as="span" flex='1' textAlign='left'>
                    <div>
                      <h1 className={titleStyles["generic-h1"]}>
                        Filter by Tag(s)
                      </h1>
                    </div>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <div className={styles["filter-options"]}>
                    <div className={styles["radio-group"]}>
                      <RadioGroup defaultValue='all' onChange={handleRadioChange}>
                        <Flex align="center" justify="center" gap={4} flexWrap="wrap">
                          <Radio colorScheme='teal' value='all'>
                            INCLUDES ALL
                          </Radio>
                          <Radio colorScheme='teal' value='one'>
                            INCLUDES ONE
                          </Radio>
                        </Flex>
                      </RadioGroup>
                    </div>
                    <div className={styles["tags"]}>
                      <Flex align="center" justify="center" gap={4} flexWrap="wrap">

                        {allTags.length > 0 ?
                          allTags.map((tag, index) => {
                            return (
                              <Center key={tag.name + tag.color + "-filter-option"}>
                                <Tag cursor="pointer" backgroundColor={tag.color} size={tag.size} onClick={() => {
                                  let tagsCopy = allTags;
                                  if (tag.size === unselectedTagSize) {
                                    // make larger when clicked
                                    tagsCopy[index] = { ...tagsCopy[index], size: selectedTagSize }
                                  } else {
                                    tagsCopy[index] = { ...tagsCopy[index], size: unselectedTagSize }
                                  }
                                  // add this modified tag back into the array of buttons
                                  changeAllTags([...tagsCopy]);
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
                          <div className={styles["progress-container"]}>
                            <CircularProgress isIndeterminate color="teal" />
                          </div>
                        }
                      </Flex>
                    </div>
                  </div>
                </AccordionPanel >
              </AccordionItem>
            </Accordion>
          </div>

        </div>
        {pageState === "loading" ?
          <div className={styles["progress-container"]}>
            <CircularProgress isIndeterminate color="teal" size="xs" />
          </div>
          :

          filteredRecipes.length > 0 ?
            <RecipeGrid recipes={filteredRecipes} size="small" flex={true} />
            :
            <div>
              No recipes found!
            </div>

        }
      </main>
    </div>
  )
}

export default Recipes