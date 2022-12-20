// https://nextjs.org/learn/basics/dynamic-routes for dynamic routes and generating stuff
import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import RecipeBox from "../../components/recipe/RecipeBox";
import { Recipe as RecipeInterface } from '../../interfaces/data/recipe';
import { getAllRecipes, getRecipeData } from '../../services/api/recipe';

const Recipe = (props: RecipeInterface) => {
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div>
            <Head>
                <title>Dulan Does Dishes</title>
                {/* make the content the title */}
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main id="main">
                <RecipeBox img={props.img} ingredients={props.ingredients} steps={props.steps} rating={props.rating} background={props.background} postCooking={props.postCooking} tags={props.tags} previewURL={false} url={props.url} date={props.date} name={props.name} />
            </main>
        </div>
    )
}

export default Recipe;

export const getStaticPaths = async () => {
    // get all possible recipes from firestore
    console.log("Getting static paths");
    const recipes = await getAllRecipes();
    // get all the urls
    if (recipes) {
        console.log(`Got ${recipes.length} recipes`)
        const paths = recipes.map((recipe) => {
            return {
                params: {
                    // must be named recipe because our file name is called [recipe]
                    recipe: recipe.url
                }
            }
        });
        return {
            paths, fallback: false
        };
    } else {
        console.error(`Error in retrieving all recipe urls in getStaticPaths`);
        throw new Error(`Error in retrieving all recipe urls in getStaticPaths`)
    }
}

// https://stackoverflow.com/questions/65078245/how-to-make-next-js-getstaticprops-work-with-typescript
export const getStaticProps: GetStaticProps = async (params: GetStaticPropsContext): Promise<{ props: RecipeInterface }> => {
    // get the data we need for a recipe
    console.log("Got params: ", params);
    const recipeParams = params.params;
    if (recipeParams) {
        const recipe = recipeParams.recipe;
        console.log(`Running getStaticProps for ${recipe}`);
        const data = await getRecipeData(recipe as string);
        if (data) {
            return { props: data };
        } else {
            throw new Error("Could not get static props");
        }
    } else {
        console.error("No params found");
        throw new Error("No params found");
    }
}