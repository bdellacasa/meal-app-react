import { Component } from 'react';
import API_KEY from '../config';
import { GET_TYPE } from '../utils/Constants';

import axios from 'axios';

const headers = {
    method: "GET"
}

const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

class ClientServiceImpl extends Component {
    
    getIngredientImgUrl = (name) => { 
        return `https://www.themealdb.com/images/ingredients/${name}.png` 
    };

    get = async (url) => {
        return axios(url, headers)
        .then(response => {
            console.log("GET "+url+" OK");
            return response.data;
        })
        .catch(error => { 
            console.log("ERROR GET "+url+" ", error.response ? error.response.status : 'network error')
            return null;
        })
    }

    searchMealByName = (name) => {
        return this.get(`${API_URL}${'/search.php?s='}${name}`);
    }

    getAllMealCategories = () => {
        return this.get(`${API_URL}${'/categories.php'}`);
    }

    getCategories = () => {
        return this.get(`${API_URL}${'/list.php?c=list'}`);
    }

    getAreas = () => {
        return this.get(`${API_URL}${'/list.php?a=list'}`);
    }

    getIngredients = () => {
        return this.get(`${API_URL}${'/list.php?i=list'}`);
    }

    filterByMainIngredient = (ingredient) => {
        return this.get(`${API_URL}${'/filter.php?i='}${ingredient}`);
    }

    filterByCategory = (category) => {
        return this.get(`${API_URL}${'/filter.php?c='}${category}`);
    }

    filterByArea = (area) => {
        return this.get(`${API_URL}${'/filter.php?a='}${area}`);      
    }

    getMeals = (type, name = null) => {
        switch(type) {
            case GET_TYPE.SEARCH:
                return this.searchMealByName(name);
            case GET_TYPE.MEALS_BY_AREA:
                return this.filterByArea(name);
            case GET_TYPE.MEALS_BY_INGREDIENT(name):
                return this.filterByMainIngredient(name);
            default:
                break;
        }
    }
}

const ClientService = new ClientServiceImpl();

export default ClientService;