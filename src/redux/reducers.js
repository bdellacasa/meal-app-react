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

const initial_state = {
    categories: [],
    ingredients: [],
    meals: [],
    loading: false
};

export const reducer = (state = initial_state, action) => {
    switch(action.type) {
        case GET_CATEGORIES_START:
        case GET_INGREDIENTS_START:
        case GET_MEALS_START:
            return Object.assign({}, state, { loading: true });

        case GET_CATEGORIES_ERROR:
        case GET_INGREDIENTS_ERROR:
        case GET_MEALS_ERROR:
            return Object.assign({}, state, { loading: false });
        
        case GET_INGREDIENTS_SUCCESS:
            return Object.assign({}, state, { ingredients: action.args, loading: false });

        case GET_CATEGORIES_SUCCESS:
            return Object.assign({}, state, { categories: action.args, loading: false });

        case GET_MEALS_SUCCESS:
            return Object.assign({}, state, { meals: action.args, loading: false });
        
        default:
            return state;
    }    
}