// https://nextjs.org/learn/basics/dynamic-routes for dynamic routes and generating stuff
import RecipeBox from "../../components/recipe/RecipeBox";
const Recipe = () => {
    return (
        <div>
            This is a test recipe
            {/* <RecipeBox /> */}
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