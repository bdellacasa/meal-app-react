import React, { useState } from 'react';
import Page from '../pages/Page';

const MealsByIngredient = () => {

    const renderContent = () => {
        return(
            <p>page under construction</p>
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

export default MealsByIngredient;