import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import '../styles/list.styles.scss';
import { PAGE_TYPE, getPageType } from '../utils/Constants'
import image_not_found from '../assets/image_not_found.png';
import placeholder from '../assets/placeholder.png';

const ListCard = (props) => {
  const pageType = getPageType(window.location.pathname.split("/")[1]);
  const [isIndexPage, setIsIndexPage] = useState(pageType == PAGE_TYPE.INDEX);
  const [loadedImg, setLoadedImg] = useState(false);

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

  const renderImg = () => {
    return(
      isIndexPage ? 
          <div className={"image-container"} style={!loadedImg ? { overflow: 'hidden' } : {}}>
            <CardImg className={"card-image"} src={props.src} onError={e => onImgError(e)} onLoad={() => setLoadedImg(true)} alt=""/>
          </div> 
          : <div style={!loadedImg ? { overflow: 'hidden' } : {}}>
              <CardImg className={"card-image"} src={props.src} onError={e => onImgError(e)} onLoad={() => setLoadedImg(true)} alt=""/>
            </div>
    )
  }

  const renderPlaceholder = () => {
    return(
      isIndexPage ? 
        <div className={"image-container"}>
          <CardImg className={"card-image-placeholder"} style={{ marginTop: '20px' }} src={placeholder} alt=""/>
        </div> 
        : <CardImg className={"card-image-placeholder"} style={{ marginTop: '60px' }} src={placeholder} onError={e => onImgError(e)} alt=""/>
    )
  }

  return (
    <Link style={{textDecoration: 'none'}} to={getUrl()} onClick={() => onClickHandler()}>
      <Card className={isIndexPage ? "card-index" : "card"}>
        {!loadedImg && renderPlaceholder()}
        { renderImg() }
        <CardBody className={isIndexPage ? "card-body-index" : "card-body"}>
          <CardTitle className={isIndexPage ? "card-title-index" : "card-title"}>{title}</CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ListCard;