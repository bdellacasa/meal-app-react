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

import { GET_TYPE } from '../utils/Constants';
import { processMeals, processIngredients } from '../utils/Helpers';

const initial_state = {
    categories: [],
    ingredients: [],
    meals: [],
    meal: null,
    loading: false
};

export const reducer = (state = initial_state, action) => {
    switch(action.type) {
        case GET_CATEGORIES_START:
        case GET_INGREDIENTS_START:
        case GET_MEALS_START:
        case GET_MEAL_DETAIL_START:
            return Object.assign({}, state, { loading: true });

        case GET_CATEGORIES_ERROR:
        case GET_INGREDIENTS_ERROR:
        case GET_MEALS_ERROR:
        case GET_MEAL_DETAIL_ERROR:
            return Object.assign({}, state, { loading: false });
        
        case GET_INGREDIENTS_SUCCESS:
            return Object.assign({}, state, { ingredients: processIngredients(action.args), loading: false });

        case GET_CATEGORIES_SUCCESS:
            return Object.assign({}, state, { categories: action.args, loading: false });

        case GET_MEALS_SUCCESS:
            return Object.assign({}, state, { meals: (action.filterType == GET_TYPE.SEARCH ? action.result : processMeals(action.result)), loading: false });

        case GET_MEAL_DETAIL_SUCCESS:
        case SAVE_CURRENT_MEAL:
            return Object.assign({}, state, { meal: action.args, loading: false });
        
        default:
            return state;
    }    
}