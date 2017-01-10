// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

type Props = {
  title: string,
  subTitle?: string
};

const Header = ({ title, subTitle }: Props) => (
  <div className="hon_page_title hon_page_title_great hon_image_bck hon_fixed"
       data-stellar-background-ratio="0.2" style={{backgroundImage: 'url(http://placehold.it/1400x900)'}}>

    {/* Over  */}
    <div className="hon_over" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}></div>

    <Grid bsClass="container text-left">
      <Row>

        <Col md={8}>
          <h1 className="hon_h1_title">{title}</h1>
          {subTitle && <h3>{subTitle}</h3>}
        </Col>

        {/*
        <Col md={4}>
          <div className="breadcrumbs">
            <a href="#">Home</a><a href="#">Blog</a><span>Blog Single Sidebar</span>
          </div>
        </Col>
        */}

      </Row>
    </Grid>
  </div>
);

export default Header;
