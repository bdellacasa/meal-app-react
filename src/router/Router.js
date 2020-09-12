import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from '../pages/Index';
import Detail from '../pages/Detail';
import MealsByParam from '../pages/MealsByParam';
import Ingredients from '../pages/Ingredients';
import SearchPage from '../pages/SearchPage';

/**
 * Router that manages the navigation of the application
 */

const ApplicationRouter = () => {
  return (
    <Router>
      <Route exact path="/" component={Index} />
      <Route path={"/detail/:id"} component={Detail} />
      <Route path={"/ingredients"} component={Ingredients} />
      <Route path={"/area/:name"} component={MealsByParam} />
      <Route path={"/ingredient/:name"} component={MealsByParam} />
      <Route path={"/category/:name"} component={MealsByParam} />
      <Route path={"/search/:name"} component={SearchPage} />
    </Router>
  )
}

export default ApplicationRouter;