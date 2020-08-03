import {
    GET_CATEGORIES_START,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    GET_INGREDIENTS_START,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    GET_MEALS_START,
    GET_MEALS_SUCCESS,
    GET_MEALS_ERROR,
    SAVE_CURRENT_MEAL,
    GET_MEAL_DETAIL_START,
    GET_MEAL_DETAIL_SUCCESS,
    GET_MEAL_DETAIL_ERROR
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

const getMealsSuccess = (result, type) => ({
    type: GET_MEALS_SUCCESS,
    result: result,
    filterType: type
})

const getMealsError = () => ({
    type: GET_MEALS_ERROR
})

const getMealDetailStart = () => ({
    type: GET_MEAL_DETAIL_START
})

const getMealDetailSuccess = (args) => ({
    type: GET_MEAL_DETAIL_SUCCESS,
    args
})

const getMealDetailError = () => ({
    type: GET_MEAL_DETAIL_ERROR
})

const saveCurrentMeal = (args) => ({
    type: SAVE_CURRENT_MEAL,
    args
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

const getMeals = (type, name) => {
    return dispatch => {
        dispatch(getMealsStart());
        ClientService.getMeals(type, name)
            .then(res => {
                dispatch(getMealsSuccess(res, type));
            })
            .catch(err => {
                console.log(err.message)
                dispatch(getMealsError());
            });
    }
}

const getMealDetail = (id) => {
    return dispatch => {
        dispatch(getMealDetailStart());
        ClientService.getMealDetail(id)
            .then(res => {
                dispatch(getMealDetailSuccess(res));
            })
            .catch(err => {
                console.log(err.message)
                dispatch(getMealDetailError());
            });
    }
}

const actions = {
    getCategories,
    getIngredients,
    getMeals,
    getMealDetail,
    saveCurrentMeal
}

export default actions;