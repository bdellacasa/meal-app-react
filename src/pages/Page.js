import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import '../styles/page.styles.scss';
import heroImage from '../assets/hero_image.jpg';

const Page = ({ content }) => {
  const isIndexPage = window.location.pathname.split("/")[1] === "";
  return (
    <div className="page">
      {isIndexPage ? <Hero imageUrl={heroImage} /> : <Header />}
      <div className={"page-content"}>
        {content}
      </div>
    </div>
  );
}

export default Page;