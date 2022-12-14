import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/home/Home.module.css';
import titleStyles from "../styles/common/title.module.css";
import RecipeGrid from '../components/home/RecipeGrid';
import RecipeCard from '../components/home/RecipeCard';
import RecipeBlock from '../components/home/RecipeBlock';

const Home: NextPage = () => {

  const recipeTest = [
    { title: "Thit Kho Gochujang", img: '/static/img/kho.jpg' },
    { title: "Honey Garlic Chicken Noodles", img: '/static/img/kho.jpg' }
  ];

  const newRecipes = [
    { title: "Salmon Garlic Oven Roast", img: '/static/img/kho.jpg' },
    { title: "Mongolian Tofu", img: '/static/img/kho.jpg' }
  ];

  return (
    <div className={styles["main"]}>
      <Head>
        <title>Dulan Does Dishes</title>
        <meta name="description" content="Cooking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="main">
        <br />
        {/* <h1 className={titleStyles["generic-title"]}>
          Dishes of the Day
        </h1>
        <RecipeGrid size="large" recipes={recipeTest} flex={false} /> */}
        <h1 className={titleStyles["generic-title"]}>
          Latest
        </h1>
        <div className={styles["tilted-wrapper"]}>
          <div className={styles["left-new"]}>
            <RecipeCard card={newRecipes[0]} size="large" tilt="right" />
          </div>
          <div className={styles["right-new"]}>
            <RecipeCard card={newRecipes[1]} size="large" tilt="left" />
          </div>
        </div>

        <h1 className={titleStyles["generic-title"]}>
          Dishes of the Day
        </h1>
        <div className={styles["tilted-wrapper"]}>
          <div className={styles["right-new"]}>
            <RecipeCard card={recipeTest[0]} size="large" tilt="left" />
          </div>
          <div className={styles["left-new"]}>
            <RecipeCard card={recipeTest[1]} size="large" tilt="right" />
          </div>
        </div>

        <RecipeBlock tilt='right' />
        <RecipeBlock tilt='left' />
        <br />
      </main>
    </div>
  )
}

export default Home

{/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}