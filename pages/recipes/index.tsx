import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/recipe/index.module.css';
import RecipeGrid from '../../components/recipe/RecipeGrid';
import titleStyles from "../../styles/common/title.module.css";
import { useEffect, useState, ChangeEventHandler } from 'react';
import { RecipeCard as RecipeCardInterface } from '../../interfaces/components/recipe';

import { Input, Accordion, AccordionItem, AccordionIcon, AccordionButton, Box, AccordionPanel } from '@chakra-ui/react';

const Recipes: NextPage = () => {

  const Recipes: RecipeCardInterface[] = [
    {
      img: "/static/img/steak.jpg",
      title: "Watermelon Steak",
      url: "watermelon-steak"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho Test",
      url: "thit-kho-test"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 1",
      url: "thit-kho-1"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 2",
      url: "thit-kho-2"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 3",
      url: "thit-kho-3"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 4",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 5",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 6",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 7",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 8",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 9",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 10",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 11",
      url: "thit-kho-4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 12",
      url: "thit-kho-4"
    },
  ];

  const [searchField, changeSearchField] = useState("");

  const [searchFieldStyle, changeSearchFieldStyle] = useState<"outline" | "filled">("outline");

  useEffect(() => {
    // change search bar style if it is filled or not
    changeSearchFieldStyle(searchField.length > 0 ? "filled" : "outline")
  }, [searchField]);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    changeSearchField(event.target.value)
  }

  return (
    <div>
      <Head>
        <title>Dulan Does Dishes</title>
        <meta name="description" content="Cooking, Life Stories, and more!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
      </Head>

      <main id="main">
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
        <RecipeGrid recipes={Recipes} size="small" flex={true} />
      </main>
    </div>
  )
}

export default Recipes