import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/home/Home.module.css';
import titleStyles from "../styles/common/title.module.css";
import RecipeCard from '../components/common/RecipeCard';
import { RecipeCard as RecipeCardInterface } from '../interfaces/components/recipe';
import RecipeBlock from '../components/home/RecipeBlock';
import { useEffect, useState } from 'react';
import { getLatestRecipes, getDailyRecipes } from '../services/api/recipe';
import { CircularProgress } from '@chakra-ui/react';

const Home: NextPage = () => {

  const [latestRecipes, setLatestRecipes] = useState<RecipeCardInterface[]>([]);

  const [dailyRecipes, setDailyRecipes] = useState<RecipeCardInterface[]>([]);


  const loadingCircle = <CircularProgress isIndeterminate color="teal" />

  useEffect(() => {

    // get newest recipes
    getLatestRecipes(2).then((recipes) => {
      if (recipes) {
        // convert the recepies to cards
        const recepieCards = recipes.map((recipe) => {
          return { ...recipe, title: recipe.name }
        });
        if (recepieCards.length >= 2) {
          setLatestRecipes(recepieCards);
        } else {
          console.error("Less than 2 latest recipes found");
        }
      }
    })

    // get daily recipes
    getDailyRecipes().then((recipes) => {
      if (recipes) {
        // convert the recepies to cards
        const recepieCards = recipes.map((recipe) => {
          return { ...recipe, title: recipe.name }
        });
        if (recepieCards.length >= 2) {
          setDailyRecipes(recepieCards);
        } else {
          console.error("Less than 2 daily recipes found");
        }
      }
    })

  }, []);

  const exampleCard: RecipeCardInterface = {
    title: "Thit Kho Test",
    img: "/static/img/kho.jpg",
    url: "thit-kho-test"
  }

  const exampleCard2: RecipeCardInterface = {
    title: "Thit Kho Test 2",
    img: "/static/img/kho.jpg",
    url: "thit-kho-test"
  }

  return (
    <div className={styles["main"]}>
      <Head>
        <title>Dulan Does Dishes</title>
        <meta name="description" content="Cooking" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
      </Head>

      <main id="main">
        <br />
        <h1 className={titleStyles["generic-title"]}>
          Latest
        </h1>
        {latestRecipes.length >= 2 ?
          <div className={styles["tilted-wrapper"]}>
            <div className={styles["left-new"]}>
              <RecipeCard key="test" card={latestRecipes[0]} size="large" tilt="right" uniqueKey='-latest-1' />
            </div>
            <div className={styles["right-new"]}>
              <RecipeCard key="test2" card={latestRecipes[1]} size="large" tilt="left" uniqueKey='-latest-2' />
            </div>
          </div>
          :
          loadingCircle
        }


        <div>

        </div>
        <h1 className={titleStyles["generic-title"]}>
          Dishes of the Day
        </h1>
        {dailyRecipes.length >= 2 ?
          <div className={styles["tilted-wrapper"]}>
            <div className={styles["left-new"]}>
              <RecipeCard card={dailyRecipes[0]} size="large" tilt="right" uniqueKey='-daily-1' />
            </div>
            <div className={styles["right-new"]}>
              <RecipeCard card={dailyRecipes[1]} size="large" tilt="left" uniqueKey='-daily-2' />
            </div>
          </div>
          :
          loadingCircle
        }

        <RecipeBlock tilt='right' card={exampleCard} />
        <RecipeBlock tilt='left' card={exampleCard2} />
        <br />
      </main>
    </div>
  )
}

export default Home;
