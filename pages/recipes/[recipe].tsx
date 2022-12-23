// https://nextjs.org/learn/basics/dynamic-routes for dynamic routes and generating stuff
import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import RecipeBox from "../../components/recipe/RecipeBox";
import { isRecipe, isRecipeArray, Recipe as RecipeInterface } from '../../interfaces/data/recipe';
import styles from "../../styles/recipe/RecipePage.module.css";
import { jwtContext } from '../_app';
import { Button } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import RecipeEditor from '../../components/recipe/RecipeEditor';
import { getAllItems, getSingleItem } from '../../backend/common';
import { recipesCollection } from '../../backend/constants';
import titleStyles from "../../styles/common/title.module.css"

const Recipe = (props: RecipeInterface) => {
    const jwt = useContext(jwtContext);
    const [showEditor, switchShowEditor] = useState(false);

    const editRecipe = () => {
        switchShowEditor(!showEditor);
    }

    return (
        <div className={styles["recipe-page"]}>
            <Head>
                <title>Dulan Does Dishes</title>
                {/* make the content the title */}
                <meta name="description" content="Cooking, Life Stories, and more!" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.ico"></link>
            </Head>

            <main id="main" className={styles["main"]}>
                {jwt && jwt.jwt ?
                    <Button colorScheme="teal" onClick={editRecipe}>
                        {showEditor ? "Remove Editor!" : "Edit Recipe!"}
                    </Button>
                    :
                    null
                }
                {showEditor ?
                    <div>
                        <RecipeEditor recipe={props} />
                        <h1 className={titleStyles["generic-title"]}>Original Recipe:</h1>
                    </div>
                    :
                    null
                }
                <RecipeBox img={props.img} ingredients={props.ingredients} steps={props.steps} rating={props.rating} background={props.background} postCooking={props.postCooking} tags={props.tags} previewURL={false} url={props.url} date={props.date} name={props.name} />
            </main>
        </div>
    )
}

export default Recipe;

/**
 * NOTE: Call API directly instead of calling the API: https://stackoverflow.com/questions/61452675/econnrefused-during-next-build-works-fine-with-next-dev
 * If you try to fetch, it will result in an ECONNREFUSED error
 * @returns 
 */
export const getStaticPaths = async () => {
    // get all possible recipes from firestore
    console.log("Getting static paths");
    // const recipes = await getAllRecipes();
    // directly call backend to get all recipes
    const recipes = await getAllItems(recipesCollection);
    // get all the urls
    if (recipes && isRecipeArray(recipes)) {
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
            paths, fallback: true // enable new paths to be rendered
        };
    } else {
        console.error(`Error in retrieving all recipe urls in getStaticPaths`);
        throw new Error(`Error in retrieving all recipe urls in getStaticPaths`)
    }
}


// https://stackoverflow.com/questions/65078245/how-to-make-next-js-getstaticprops-work-with-typescript - for the types and stuff
/**
 * NOTE: Call API directly instead of calling the API: https://stackoverflow.com/questions/61452675/econnrefused-during-next-build-works-fine-with-next-dev
 * If you try to fetch, it will result in an ECONNREFUSED error
 * @returns 
 */
export const getStaticProps: GetStaticProps = async (params: GetStaticPropsContext): Promise<GetStaticPropsResult<RecipeInterface>> => {
    // get the data we need for a recipe
    console.log("Got params: ", params);
    const recipeParams = params.params;
    if (recipeParams) {
        const recipe = recipeParams.recipe;
        console.log(`Running getStaticProps for ${recipe}`);
        // const data = await getRecipeData(recipe as string);
        const data = await getSingleItem(recipesCollection, recipe as string)
        if (data && isRecipe(data)) {
            return { props: data, revalidate: 2.628e+6 }; // revalidate every month at most
        } else {
            throw new Error("Could not get static props");
        }
    } else {
        console.error("No params found");
        throw new Error("No params found");
    }
}