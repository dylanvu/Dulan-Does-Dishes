// https://nextjs.org/learn/basics/dynamic-routes for dynamic routes and generating stuff
import type { NextPage } from 'next';
import Head from 'next/head';
import RecipeBox from "../../components/recipe/RecipeBox";


const Recipe: NextPage = () => {

    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                {/* make the content the title */}
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main id="main">
                <RecipeBox />
            </main>
        </div>
    )
}

export default Recipe;

// export const getAllRecipes = async () => {
//     // http request to api
// }

// export const getStaticPaths = async (): Promise<{ params: { recipe: string } }> => {
//     // get all possible recipes from firestore for the url
//     await fetch("http://localhost:3000/api/recipe/")
// }

// export const getStaticProps = async (params: { params: { recipe: string } }, fallback: boolean) => {
//     // get the data we need for a recipe
// }