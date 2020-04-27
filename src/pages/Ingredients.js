import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import actions from '../redux/actions';
import Page from './Page';
import List from '../components/List';
import ClientService from '../services/ClientService';
import '../styles/list.styles.scss';

const Ingredients = ({ loadedIngredients, loading, getIngredients }) => {
    const [ingredients, setIngredients ] = useState([]);

    useEffect(() => {
        if (!!loadedIngredients && loadedIngredients.length ==  0) {
            getIngredients()
        }
    }, [loadedIngredients, loading])

    if(ingredients.length == 0 && !!loadedIngredients && !!loadedIngredients.meals) {
        setIngredients(loadedIngredients.meals.map(ingredient => ({
            id: ingredient.idIngredient,
            src: ClientService.getIngredientImgUrl(ingredient.strIngredient),
            title: ingredient.strIngredient,
            description: ingredient.strDescription,
        })))
    }

    const renderContent = () => {
        return(
            <div>
                {!loading ? 
                    <div>
                        <p className={"list-title"}>Ingredients</p>
                        <List data={ingredients}/>
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
    loadedIngredients: state.reducer.ingredients,
    loading: state.reducer.loading
})

const mapDispatchToProps = dispatch => ({
    getIngredients: () => dispatch(actions.getIngredients())    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ingredients);