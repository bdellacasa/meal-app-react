import React from 'react';
import '../styles/list.styles.scss';
import Card from './ListCard';

const List = ({ data, onClick }) => {
    const handleOnClick = (element) => {
        if (onClick) {
            onClick(element);
        }
    }

    const cardsArray = data.map((element, idx) => (
        <Card
            key={idx}
            id={element.id}
            src={element.src}
            title={element.title}
            description={element.description}
            onClick={() => handleOnClick(element)} />
    ));

    return (
        <div className={"list"}>
            {cardsArray}
        </div>
    )
}

export default List;