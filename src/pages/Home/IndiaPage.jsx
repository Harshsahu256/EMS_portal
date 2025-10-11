// src/pages/IndiaPage.jsx

import React from 'react';
import { Container } from 'react-bootstrap';
import NewsGrid from '../../components/IndiaPage/NewsGrid';
import OtherNews from '../../components/IndiaPage/OtherNews';
import TopNews from '../../components/IndiaPage/TopNews';

const IndiaPage = () => {
  return (
    <>
    <TopNews/>
    <NewsGrid/>
    <OtherNews/>
    </>

  );
};

export default IndiaPage;