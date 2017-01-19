// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import Overlay from '../components/Overlay';

import type { url } from './types';

type Props = {
  title: string,
  subTitle?: string,
  hero?: url
};

const Header = ({ title, subTitle, hero }: Props) => (
  <div className="hon_page_title hon_page_title_great hon_image_bck"
       data-stellar-background-ratio="0.2"
       style={{
         backgroundImage: `url(${hero ? hero : 'http://placehold.it/1400x900'})`,
         backgroundAttachment: 'fixed'
       }}>

    <Overlay />

    <Grid bsClass="container text-left">
      <Row>

        <Col md={8}>
          <h1 className="hon_h1_title">{title}</h1>
          {subTitle && <h3>{subTitle}</h3>}
        </Col>

      </Row>
    </Grid>
  </div>
);

export default Header;
