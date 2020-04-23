import React, { useState } from 'react';
import Page from '../pages/Page';

const Detail = () => {

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

export default Detail;