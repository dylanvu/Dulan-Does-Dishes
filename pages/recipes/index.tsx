import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/recipe/index.module.css';
import RecipeCard from '../../components/home/RecipeCard';
import RecipeGrid from '../../components/home/RecipeGrid';
import titleStyles from "../../styles/common/title.module.css";
import { useEffect, useState, ChangeEventHandler } from 'react';

import { Input, Accordion, AccordionItem, AccordionIcon, AccordionButton, Box, AccordionPanel } from '@chakra-ui/react';

const Recipes: NextPage = () => {

  const Recipes: RecipeCard[] = [
    {
      img: "/static/img/steak.jpg",
      title: "Watermelon Steak"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho "
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 1"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 2"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 3"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 4"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 5"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 6"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 7"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 8"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 9"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 10"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 11"
    },
    {
      img: "/static/img/kho.jpg",
      title: "Thit Kho 12"
    },
  ];

  const [searchField, changeSearchField] = useState("");

  const [searchFieldStyle, changeSearchFieldStyle] = useState<"outline" | "filled">("outline");

  const [tagSet, setTagSet] = useState<Set<string>>(new Set());

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