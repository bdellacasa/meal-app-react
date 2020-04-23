import React, { Component } from 'react';
import '../styles/list.styles.scss';
import Card from './ListCard';

const List = (props) => {  
    const cardsArray = props.data.map((element, idx) => (
        <Card
            key={idx}
            id={element.id}
            src={element.src}
            title={element.title}
            description={element.description}/>
    ));
    return(
        <div className={"list"}>
            {cardsArray}
        </div>
    )
}

export default List;