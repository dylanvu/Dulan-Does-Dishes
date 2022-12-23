import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';

import styles from '../styles/home/Home.module.css';
import titleStyles from "../styles/common/title.module.css";
import RecipeCard from '../components/common/RecipeCard';
import { isRecipeArray, Recipe } from "../interfaces/data/recipe";
import RecipeBlock from '../components/home/RecipeBlock';
import { CircularProgress } from '@chakra-ui/react';
import { getLatestItem, getRandomByDayItems } from '../backend/common';
import { recipesCollection } from '../backend/constants';

const Home = ({ latest, daily }: { latest: Recipe[], daily: Recipe[] }) => {

  const loadingCircle = <CircularProgress isIndeterminate color="teal" size="xs" />

  return (
    <div className={styles["home"]}>
      <Head>
        <title>Dulan Does Dishes</title>
        <meta name="description" content="Cooking" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
      </Head>

      <main id="main" className={styles["main"]}>
        <br />
        <h1 className={titleStyles["generic-title"]}>
          Latest
        </h1>
        {latest.length >= 2 ?
          <div className={styles["tilted-wrapper"]}>
            <div className={styles["left-new"]}>
              <RecipeCard key="test" card={latest[1]} size="large" tilt="right" uniqueKey='-latest-1' />
            </div>
            <div className={styles["right-new"]}>
              <RecipeCard key="test2" card={latest[0]} size="large" tilt="left" uniqueKey='-latest-2' />
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
        {daily.length >= 2 ?
          <div className={styles["tilted-wrapper"]}>
            <div className={styles["left-new"]}>
              <RecipeCard card={daily[0]} size="large" tilt="right" uniqueKey='-daily-1' />
            </div>
            <div className={styles["right-new"]}>
              <RecipeCard card={daily[1]} size="large" tilt="left" uniqueKey='-daily-2' />
            </div>
          </div>
          :
          loadingCircle
        }

        {daily.length >= 2 ?
          <div>
            <RecipeBlock tilt='right' card={daily[1]} text="rating" />
            <RecipeBlock tilt='left' card={daily[0]} text="postCooking" />
          </div>
          :
          null
        }

      </main>
    </div>
  )
}

export default Home;

export const getStaticProps = async (params: GetStaticPropsContext): Promise<GetStaticPropsResult<{ latest: Recipe[], daily: Recipe[] }>> => {
  const latest = await getLatestItem(recipesCollection, 2);
  if (!latest || !isRecipeArray(latest)) {
    console.error("Could not get latest recipes");
    throw new Error("Could not get latest recipes");
  }

  const daily = await getRandomByDayItems(recipesCollection, 2)
  if (!daily || !isRecipeArray(daily)) {
    console.error("Could not get daily recipes");
    throw new Error("Could not get daily recipes");
  }

  return {
    props: { latest: latest, daily: daily },
    revalidate: 86400 // once a day
  }
}