import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import actions from '../redux/actions';
import Page from '../pages/Page';
import List from '../components/List';
import '../styles/index.styles.scss';

const Index = ({ loadedCategories, loading, getAllMealCategories }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (loadedCategories && loadedCategories.length === 0) {
            getAllMealCategories()
        }
        if (categories.length === 0 && loadedCategories && loadedCategories.categories) {
            setCategories(loadedCategories.categories.map(category => ({
                id: category.idCategory,
                src: category.strCategoryThumb,
                title: category.strCategory,
                description: category.strCategoryDescription,
            })))
        }
    }, [loadedCategories, loading])

    const renderContent = () => {
        return (
            <div>
                {!loading ?
                    <div>
                        <p className={"list-title"}>Meal By Category</p>
                        <List data={categories} />
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
    loadedCategories: state.reducer.categories,
    loading: state.reducer.loading
})

const mapDispatchToProps = dispatch => ({
    getAllMealCategories: () => dispatch(actions.getCategories())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);