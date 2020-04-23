import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from '../pages/Index';
import Detail from '../pages/Detail';
import MealsByArea from '../pages/MealsByArea';
import Ingredients from '../pages/Ingredients';
import MealsByIngredient from '../pages/MealsByIngredient';
import SearchPage from '../pages/SearchPage';

/**
 * Router that manages the navigation of the application
 */

function ApplicationRouter() {
    return(
        <Router>
            <Route exact path="/" component={Index} />
            <Route path={"/detail/:id"} component={Detail} />
            <Route path={"/area/:id"} component={MealsByArea} />
            <Route path={"/ingredients"} component={Ingredients} />
            <Route path={"/ingredient/:name"} component={MealsByIngredient} />
            <Route path={"/search/:name"} component={SearchPage} />
        </Router>
    )
}

export default ApplicationRouter;