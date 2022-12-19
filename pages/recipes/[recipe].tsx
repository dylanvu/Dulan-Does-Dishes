// https://nextjs.org/learn/basics/dynamic-routes for dynamic routes and generating stuff
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import RecipeBox from "../../components/recipe/RecipeBox";
import { apiBase } from '../../components/constants';


const Recipe: NextPage = () => {
    useEffect(() => {
        getStaticPathsT();
    }, [])
    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                {/* make the content the title */}
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main id="main">
                {/* <RecipeBox /> */}
            </main>
        </div>
    )
}

export default Recipe;

export const getStaticPathsT = async () => {
    // get all possible recipes from firestore for the url
    const res = await fetch(`${apiBase}recipe/all`);
    console.log(res)
    if (res.ok) {
        const json = await res.json();
        console.log(json);
    } else {
        console.error("static props returned a " + res.status)
    }

}

// export const getStaticProps = async (params: { params: { recipe: string } }, fallback: boolean) => {
//     // get the data we need for a recipe
// }