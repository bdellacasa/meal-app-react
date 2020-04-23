import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import '../styles/list.styles.scss';

const ListCard = (props) => {
  const [isIndexPage, setIsIndexPage] = useState(window.location.pathname.split("/")[1] == "");

  return (
    <Card className={"card"}>
      {isIndexPage ? <div className={"image-container"}>
          <CardImg className={"card-image-index"} src={props.src} alt=""/>
        </div> :
        <CardImg className={"card-image"} src={props.src} alt=""/>
      }
      <CardBody>
        <CardTitle className={isIndexPage ? "card-title-index" : "card-title"}>{props.title}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default ListCard;