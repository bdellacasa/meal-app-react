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
    const [filter, setFilter] = useState(true);

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
        let title;
        switch(getPageType(window.location.pathname.split("/")[1])) {
            case PAGE_TYPE.AREA:
                title = `${param} food`;
            break;
            case PAGE_TYPE.INGREDIENT:
                title = `Food with ${param}`;
            break;
            case PAGE_TYPE.CATEGORY:
                title = `Category: ${param}`;
            break;
        }
        return title.replace(/%20/g, " ");
    }

    useEffect(() => {
        if (meals.length == 0 && filter) {
            fetchMeals();
            setFilter(false)
        }
        if(!!loadedMeals) {
            setMeals(loadedMeals);
        }
        
    }, [loadedMeals, loading])

    const onClickHandler = (element) => {
        getMealDetail(element.id)
    }

    const renderContent = () => {
        return(
            <div>
                {!loading ? 
                    <div>
                        <div>
                            {(meals.length > 0) ?
                                <div>
                                    <p className={"list-title"}>{getTitle()}</p>
                                    <List data={meals} onClick={element => onClickHandler(element)}/>
                                </div>
                            :   <p className={"list-title"}> Not food found</p>
                            }
                        </div>
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