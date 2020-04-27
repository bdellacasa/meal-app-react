import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Spinner, Badge } from 'reactstrap';
import Page from './Page';
import '../styles/detail.styles.scss'

const Detail = ({ currentMeal, loading }) => {
    const [meal, setMeal] = useState(undefined);
   
    const getFieldArray = (object, keyValue) => {
        const keys = Object.keys(object);
        const matchingKeys = keys.filter((key) => key.includes(keyValue));
        return matchingKeys.map((key) => object[key] ).filter(value => value !== "" && value !== " " && value !== null); 
    }

    const history = useHistory();

    useEffect(() => {
        if (!!currentMeal && (meal !== currentMeal)) {
            const _meal = {
                src: currentMeal.strMealThumb,
                title: currentMeal.strMeal,
                category: currentMeal.strCategory,
                area: currentMeal.strArea,
                instructions: currentMeal.strInstructions,
                src: currentMeal.strMealThumb,
                tags: currentMeal.strTags,
                video: currentMeal.strYoutube,
                ingredients: getFieldArray(currentMeal, "strIngredient"),
                measures: getFieldArray(currentMeal, "strMeasure")
            };
            setMeal(_meal)
            localStorage.setItem('lastMeal', JSON.stringify(_meal));
        } else if(!meal) { //in case of refreshing the page
                const lastMeal = JSON.parse(localStorage.getItem('lastMeal'));
                setMeal(lastMeal);
        }
        //clear the storage when route changes
        history.listen((location) => {
            localStorage.clear();
        })

    }, [currentMeal, loading])


    const ingredients = !!meal && !!meal.ingredients && meal.ingredients.map((value, idx) => {
        return(
            <p className={"detail-info-item"}>{`${value} ${meal.measures[idx]}`}</p>
        )}
    );

    const tags = !!meal && meal.tags && meal.tags.split(',').map(tag => {
        return(
            <Badge color="info" className={"detail-tag"} style={{ paddingTop: '10px' }}>{tag}</Badge>
        )
    });

    const renderDetail = () => {
        return(
            <div style={{paddingBottom: '50px'}}>
                <div className={"detail-info-container"}>
                    <img src={meal.src} className={"detail-img"} />
                    <div className={"detail-info"}>
                        <p className={"detail-info-title"}>{meal.title}</p>
                        <p className={"detail-info-item"} style={{fontWeight: 'bold'}}>{`Category`}</p>
                        <p className={"detail-info-item"}>{`${meal.category}`}</p>
                        <p className={"detail-info-item"} style={{fontWeight: 'bold'}}>{`Area`}</p>
                        <p className={"detail-info-item"}>{`${meal.area}`}</p>
                        <div className={"detail-info-tags"}>
                            {tags}
                        </div>
                    </div>
                </div>
                <div className={"detail-ingredients"}>
                    <p className={"detail-info-title"}>Ingredients</p>
                    {ingredients}
                </div>
                <div className={"detail-instructions"}>
                    <p className={"detail-info-title"}>Instructions</p>
                    {meal.instructions}
                </div>
            </div>
        )
    }

    const renderContent = () => {
        return(
            <div>
                {!loading ? 
                    <div>
                        {!!meal && renderDetail()}
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
    currentMeal: state.reducer.meal,
    loading: state.reducer.loading
})

export default connect(
    mapStateToProps
)(Detail);