import ClientService from '../services/ClientService';

export const processMeals = (result) => {
    return (!!result.meals ? 
        result.meals.map(meal => ({
            id: meal.idMeal,
            src: meal.strMealThumb,
            title: meal.strMeal
        }))
    : []);
}

export const processIngredients = (result) => {
    return (!!result.meals ? 
        result.meals.map(ingredient => ({
            id: ingredient.idIngredient,
            src: ClientService.getIngredientImgUrl(ingredient.strIngredient),
            title: ingredient.strIngredient
        }))
    : []);
}