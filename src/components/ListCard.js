import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import actions from '../redux/actions';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import '../styles/list.styles.scss';
import { PAGE_TYPE, getPageType } from '../utils/Constants'
import image_not_found from '../assets/image_not_found.png';

const ListCard = (props) => {
  const pageType = getPageType(window.location.pathname.split("/")[1]);
  const [isIndexPage, setIsIndexPage] = useState(pageType == PAGE_TYPE.INDEX);

  const getUrl = () => {
    if (pageType == PAGE_TYPE.INDEX) {
      return `/category/${props.title}`;
    } else if (pageType == PAGE_TYPE.LIST_INGREDIENTS) {
      return `/ingredient/${props.title}`;
    } else {
      return `/detail/${props.id}`;
    }
  }

  const onImgError = (e) => {
    e.target.src = image_not_found;
  }

  const onClickHandler = () => {
    props.onClick();
  }

  const title = props.title.length > 30 ? `${props.title.slice(0,30)}...` : props.title;

  return (
    <Link style={{textDecoration: 'none'}} to={getUrl()} onClick={() => onClickHandler()}>
      <Card className={isIndexPage ? "card-index" : "card"}>
        {isIndexPage ? <div className={"image-container"}>
            <CardImg className={"card-image-index"} src={props.src} style={{ marginTop: '20px' }}  onError={e => onImgError(e)} alt=""/>
          </div> :
          <CardImg className={"card-image"} src={props.src} onError={e => onImgError(e)} alt=""/>
        }
        <CardBody className={isIndexPage ? "card-body-index" : "card-body"}>
          <CardTitle className={isIndexPage ? "card-title-index" : "card-title"}>{title}</CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ListCard;