import type { NextPage } from 'next';
import Head from 'next/head';
import styles from "../../styles/recipe/NewRecipe.module.css";
import RecipeEditor from "../../components/recipe/RecipeEditor";

const NewRecipe: NextPage = () => {

    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                <meta name="description" content="Cooking" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
            </Head>
            <main className={styles.main} id="main">
                <RecipeEditor recipe={undefined} />
            </main>
        </div>
    )
}

export default NewRecipe;