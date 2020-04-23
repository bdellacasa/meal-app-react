import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import actions from '../redux/actions';
import Page from './Page';
import List from '../components/List';
import '../styles/list.styles.scss';
import { GET_TYPE } from '../utils/Constants';

const MealsByArea = ({ loadedMeals, loading, getMeals }) => {
    const [meals, setMeals ] = useState([]);
    const [area, setArea] = useState(window.location.pathname.split("/")[2]);

    useEffect(() => {
        if (loadedMeals.length ==  0) {
            getMeals(GET_TYPE.MEALS_BY_AREA, area)
        }
    }, [loadedMeals, loading])

    if(meals.length == 0 && !!loadedMeals && !!loadedMeals.meals) {
        setMeals(loadedMeals.meals.map(meal => ({
            id: meal.idMeal,
            src: meal.strMealThumb,
            title: meal.strMeal
        })))
    }

    const renderContent = () => {
        return(
            <div>
                {!loading ? 
                    <div>
                        <p className={"list-title"}>{`${area} food`}</p>
                        <List data={meals}/>
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
    getMeals: (type, name) => dispatch(actions.getMeals(type, name))    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealsByArea);