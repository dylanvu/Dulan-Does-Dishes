import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/recipe/index.module.css';
import RecipeGrid from '../../components/recipe/RecipeGrid';
import titleStyles from "../../styles/common/title.module.css";
import { useEffect, useState, ChangeEventHandler } from 'react';
import { RecipeCard as RecipeCardInterface } from '../../interfaces/components/recipe';
import { CircularProgress } from '@chakra-ui/react';
import { getAllRecipes } from '../../services/api/recipe';

import { Input, Accordion, AccordionItem, AccordionIcon, AccordionButton, Box, AccordionPanel } from '@chakra-ui/react';

const Recipes: NextPage = () => {

  const [searchField, changeSearchField] = useState("");

  const [searchFieldStyle, changeSearchFieldStyle] = useState<"outline" | "filled">("outline");

  const [pageState, changePageState] = useState<"idle" | "loading" | "error">("idle");

  const [recipes, changeRecipes] = useState<RecipeCardInterface[]>([]);

  useEffect(() => {
    // change search bar style if it is filled or not
    changeSearchFieldStyle(searchField.length > 0 ? "filled" : "outline")
  }, [searchField]);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    changeSearchField(event.target.value)
  }

  useEffect(() => {
    changePageState("loading");
    getAllRecipes().then((res) => {
      if (res) {
        const recipeCardArray: RecipeCardInterface[] = res.map((recipe) => {
          return { ...recipe, title: recipe.name }
        })
        changeRecipes(recipeCardArray);
        changePageState("idle");
      } else {
        changePageState("error");
      }
    }).catch((e) => {
      console.error(e);
    });
  }, [])

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
            <Input variant={searchFieldStyle} placeholder='Search for a dish...' colorScheme="teal" focusBorderColor='#79B4B7' onChange={handleSearchChange} />
          </div>
          <div className={styles["filter-container"]}>
            <Accordion allowToggle>
              <AccordionItem borderColor="#9D9D9D">
                <AccordionButton _expanded={{ bg: '#79B4B7', color: '#FEFBF3' }}>
                  <Box as="span" flex='1' textAlign='left'>
                    <div>
                      <h1 className={titleStyles["generic-h1"]}>
                        Filter by Tag
                      </h1>
                    </div>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <div className={styles["filter-options"]}>
                    Test Tags
                  </div>
                </AccordionPanel >
              </AccordionItem>
            </Accordion>
          </div>

        </div>
        {pageState === "loading" ?
          <CircularProgress isIndeterminate color="teal" size="md" />
          :
          <RecipeGrid recipes={recipes} size="small" flex={true} />}
      </main>
    </div>
  )
}

export default Recipes