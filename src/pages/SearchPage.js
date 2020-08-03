import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import actions from '../redux/actions';
import Page from './Page';
import List from '../components/List';
import '../styles/list.styles.scss';
import { GET_TYPE } from '../utils/Constants';
import { processMeals } from '../utils/Helpers'

const SearchPage = ({ loadedMeals, loading, getMeals, saveCurrentMeal }) => {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState(true);
    const name = window.location.pathname.split("/")[2];

    useEffect(() => {
        if (meals.length === 0 && search) {
            getMeals(GET_TYPE.SEARCH, name);
            setSearch(false);
        }
        if (loadedMeals) {
            setMeals(processMeals(loadedMeals));
        }
    }, [loadedMeals])

    const onClickHandler = (element) => {
        const currentMeal = loadedMeals.meals.find(m => m.idMeal === element.id);
        saveCurrentMeal(currentMeal);
    }

    const renderContent = () => {
        return (
            <div>
                {!loading ?
                    <div>
                        {(meals.length > 0) ?
                            <div>
                                <p className={"list-title"}>{`Search results: ${name}`}</p>
                                <List data={meals} onClick={element => onClickHandler(element)} />
                            </div>
                            : <p className={"list-title"}> No food matches your search.</p>
                        }
                    </div>
                    : <div style={{ marginTop: '30vh' }}>
                        <Spinner style={{ width: '4rem', height: '4rem' }} color="primary" />
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
    saveCurrentMeal: (meal) => dispatch(actions.saveCurrentMeal(meal))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);