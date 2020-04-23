import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import '../styles/hero.styles.scss';

const Hero = (props) => {
  return (
    <div className={"hero-background"} style={{backgroundImage: `url(${props.imageUrl})`}}>
        <div className={"hero-opacity"}>
            <div className={"header-container"}>
                <Header/>
            </div>
            <div className={"hero-content-container"}>
                <p className={"hero-text"}>It is even better than an expensive cookery book !</p>
                <p className={"hero-subtext"}>Learn how to make your favorite dishes</p>
                <div className={"hero-search-container"}>
                    <Search/>
                </div>
            </div>
        </div>
  </div>
  );
};

export default Hero;