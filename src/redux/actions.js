import { 
    GET_CATEGORIES_START, 
    GET_CATEGORIES_SUCCESS, 
    GET_CATEGORIES_ERROR, 
    GET_INGREDIENTS_START,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    GET_MEALS_START,
    GET_MEALS_SUCCESS,
    GET_MEALS_ERROR  
} from "./types";

import ClientService from '../services/ClientService';

/**
 *  Redux actions for get categories, ingredients and meals 
 */

const getCategoriesStart = () => ({
    type: GET_CATEGORIES_START
});

const getCategoriesSuccess = (args) => ({
    type: GET_CATEGORIES_SUCCESS,
    args
});

const getCategoriesError = () => ({
    type: GET_CATEGORIES_ERROR
})

const getIngredientsStart = () => ({
    type: GET_INGREDIENTS_START
})

const getIngredientsSuccess = (args) => ({
    type: GET_INGREDIENTS_SUCCESS,
    args
})

const getIngredientsError = () => ({
    type: GET_INGREDIENTS_ERROR
})

const getMealsStart = () => ({
    type: GET_MEALS_START
})

const getMealsSuccess = (args) => ({
    type: GET_MEALS_SUCCESS,
    args
})

const getMealsError = () => ({
    type: GET_MEALS_ERROR
})

const getCategories = () => {
    return dispatch => {
        dispatch(getCategoriesStart());

        ClientService.getAllMealCategories()
            .then(res => {
                dispatch(getCategoriesSuccess(res));
            })
            .catch(err => {
                console.log(err.message)
                dispatch(getCategoriesError());
            });
    }
}

const getIngredients = () => {
    return dispatch => {
        dispatch(getIngredientsStart());
    
        ClientService.getIngredients()
          .then(res => {
            dispatch(getIngredientsSuccess(res));
          })
          .catch(err => {
            console.log(err.message)
            dispatch(getIngredientsError());
          });
    }
}

const getMeals = (type, name = null) => {
    return dispatch => {
        dispatch(getMealsStart());
    
        ClientService.getMeals(type,name)
          .then(res => {
            dispatch(getMealsSuccess(res));
          })
          .catch(err => {
            console.log(err.message)
            dispatch(getMealsError());
          });
    }
}

const actions = {
    getCategories,
    getIngredients,
    getMeals
}

export default actions;