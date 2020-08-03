import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import actions from '../redux/actions';
import Page from './Page';
import List from '../components/List';
import '../styles/list.styles.scss';
import Paginator from '../components/Paginator';

const Ingredients = ({ loadedIngredients, loading, getIngredients }) => {
    const [ingredients, setIngredients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentIngredients, setCurrentIngredients] = useState([]);
    const ingredientsPerPage = 10;

    useEffect(() => {
        if (ingredients.length === 0) {
            getIngredients();
        }
        if (loadedIngredients) {
            setIngredients(loadedIngredients);
            setTotalPages(loadedIngredients.length / ingredientsPerPage);
        }
        let last = currentPage * ingredientsPerPage;
        let first = last - ingredientsPerPage;
        setCurrentIngredients(ingredients.slice(first, last))
    }, [loadedIngredients, currentPage])

    const renderContent = () => {
        return (
            <div>
                {!loading ?
                    currentIngredients.length > 0 && <div className={"list-ingredients-container"}>
                        <p className={"list-title"}>Ingredients</p>
                        <List data={currentIngredients} />
                        <Paginator totalPages={totalPages} maxPagesToShow={15} paginate={page => setCurrentPage(page)} />
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