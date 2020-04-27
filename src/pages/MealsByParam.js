import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import actions from '../redux/actions';
import Page from './Page';
import List from '../components/List';
import '../styles/list.styles.scss';
import { GET_TYPE, getPageType, PAGE_TYPE } from '../utils/Constants';

const MealsByParam = ({ loadedMeals, loading, getMeals, getMealDetail }) => {
    const [meals, setMeals ] = useState([]);
    const [param, setParam] = useState(window.location.pathname.split("/")[2]);

    const fetchMeals = () => {
        switch(getPageType(window.location.pathname.split("/")[1])) {
            case PAGE_TYPE.AREA:
                return getMeals(GET_TYPE.MEALS_BY_AREA, param);
            case PAGE_TYPE.INGREDIENT:
                return getMeals(GET_TYPE.MEALS_BY_INGREDIENT, param);
            case PAGE_TYPE.CATEGORY:
                return getMeals(GET_TYPE.MEALS_BY_CATEGORY, param)
        }
    }

    const getTitle = () => {
        switch(getPageType(window.location.pathname.split("/")[1])) {
            case PAGE_TYPE.AREA:
                return `${param} food`;
            case PAGE_TYPE.INGREDIENT:
                return `Food with ${param}`;
            case PAGE_TYPE.CATEGORY:
                return `Category: ${param}`
        }
    }

    useEffect(() => {
        if (!!loadedMeals && loadedMeals.length ==  0) {
            fetchMeals();
        }
    }, [loadedMeals, loading])

    if(meals.length == 0 && !!loadedMeals && !!loadedMeals.meals) {
        setMeals(loadedMeals.meals.map(meal => ({
            id: meal.idMeal,
            src: meal.strMealThumb,
            title: meal.strMeal
        })))
    }

    const onClickHandler = (element) => {
        getMealDetail(element.id)
    }

    const renderContent = () => {
        return(
            <div>
                {!loading ? 
                    <div>
                        <p className={"list-title"}>{getTitle()}</p>
                        <List data={meals} onClick={element => onClickHandler(element)}/>
                    </div>
                :   <div style={{marginTop: '30vh'}}>  
                        <Spinner style={{ width: '4rem', height: '4rem' }} color="primary"/>
                    </div>
                }
            </div>
        )
    }

    return (
        <Page
            content={
                renderContent()
            }
        />
    );
}

/**
 *
 * @param {ReduxState} state
 * @param {object} props
 */
const mapStateToProps = (state, props) => ({
    loadedMeals: state.reducer.meals,
    loading: state.reducer.loading
})

const mapDispatchToProps = dispatch => ({
    getMeals: (type, name) => dispatch(actions.getMeals(type, name)),
    getMealDetail: (id) => dispatch(actions.getMealDetail(id))    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealsByParam);