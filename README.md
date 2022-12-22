# Dulan Does Dishes
Built using Next.js, TypeScript, Firestore, Chakra UI, and JSON Web Tokens

Has an API but no documentation yet.

## Next Steps
* Ability to sort recipes by latest in the `/recipes` page
* Add floaing text around the latest and/or improve styling of recipe block
* Utilize static props in the index (`/`) and recipes (`/recipes`) page
* Add total number of recipes in about section
* Fix API calls error handling
* Refactor backend to make a common "get all items" route. It takes in parameter of collection name, item type, and typeGuard function
* Separate images from recipes into another collection and get images on render instead
* Migrate to Next.js 13 (will break images! Images are hard to work with)
* Write documentation for API
* Fix the tiny styling issue in the recipe editor for mobile portrait mode