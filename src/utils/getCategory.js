import { triviaCategories } from "./categories";

function getCategory(id) {
    for (let category of triviaCategories) {
        if (category.id === id) {
            return category.name;
        }
    }
    return null; 
}

export default getCategory