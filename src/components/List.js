import React, { Component } from 'react';
import '../styles/list.styles.scss';
import Card from './ListCard';

const List = (props) => {
    const onClick = (element) => {
        if (!!props.onClick) {
            props.onClick(element);
        }
    }

    const cardsArray = props.data.map((element, idx) => (
        <Card
            key={idx}
            id={element.id}
            src={element.src}
            title={element.title}
            description={element.description}
            onClick={() => onClick(element)}/>
    ));
    
    return(
        <div className={"list"}>
            {cardsArray}
        </div>
    )
}

export default List;