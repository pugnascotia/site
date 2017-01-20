// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import Animated from '../components/Animated';
import IconBox from '../components/IconBox';
import Overlay from '../components/Overlay';
import Statistic from '../components/Statistic';

import { withBackground } from '../StyleUtils';

const Testimonials = (props) => (
  <section className="hon_section">
    <Grid className="text-center">

      <h2>Testimonials</h2>
      <h3>I Always Have Something to Show You</h3>

      {/* boxes  */}
      <div className="hon_icon_boxes hon_team_slider owl-carousel owl-theme">

        {/* item  */}
        <div className="hon_news_block text-center">
              <span className="hon_news_img">
                <img src="http://placehold.it/600x400" alt=""/>
              </span>
          <span className="hon_news_title">Really great work</span>
          <span className="hon_news_author">Lawrence Stephens | Comedian</span>
          <p>Vero is always a pleasure to work with.I know I can get  support when I need…</p>
        </div>

        {/* item  */}
        <div className="hon_news_block text-center">
              <span className="hon_news_img">
                <img src="http://placehold.it/600x400" alt=""/>
              </span>
          <span className="hon_news_title">Impressive support</span>
          <span className="hon_news_author">Carolyn Moreno | Judge</span>
          <p>Vero is extremely responsive to support requests and goes out of his way to resolve issues</p>
        </div>

        {/* item  */}
        <div className="hon_news_block text-center">
                        <span className="hon_news_img">
                            <img src="http://placehold.it/600x400" alt=""/>
                        </span>
          <span className="hon_news_title">Great design</span>
          <span className="hon_news_author">Donald Green | IT consultant</span>
          <p>Awesome to work with. Incredibly organized, easy to communicate with, beautiful work</p>
        </div>

        {/* item  */}
        <div className="hon_news_block text-center">
                        <span className="hon_news_img">
                            <img src="http://placehold.it/600x400" alt=""/>
                        </span>
          <span className="hon_news_title">Really great work</span>
          <span className="hon_news_author">Lawrence Stephens | Comedian</span>
          <p>Vero is always a pleasure to work with.I know I can get  support when I need…</p>
        </div>

        {/* item  */}
        <div className="hon_news_block text-center">
                        <span className="hon_news_img">
                            <img src="http://placehold.it/600x400" alt=""/>
                        </span>
          <span className="hon_news_title">Impressive support</span>
          <span className="hon_news_author">Carolyn Moreno | Judge</span>
          <p>Vero is extremely responsive to support requests and goes out of his way to resolve issues</p>
        </div>

        {/* item  */}
        <div className="hon_news_block text-center">
                        <span className="hon_news_img">
                            <img src="http://placehold.it/600x400" alt=""/>
                        </span>
          <span className="hon_news_title">Great design</span>
          <span className="hon_news_author">Donald Green | IT consultant</span>
          <p>Awesome to work with. Incredibly organized, easy to communicate with, beautiful work</p>
        </div>


      </div>
      {/* boxes end  */}


    </Grid>
  </section>
);

const About = () => (
  <div>
    <div className="hon_page_title hon_page_title_great hon_image_bck hon_fixed hon_wht_txt"
      {...withBackground('http://verothemes.com/hondo/images/about/sl.jpg')}>

      <Overlay r={0} g={0} b={0} opacity={0.4} />

      <Grid className="text-left">
        <Row>
          <Col md={8}>
            <h1 className="hon_h1_title">About</h1>
            <h3>Tea-fuelled chainsaw juggler</h3>
          </Col>
        </Row>
      </Grid>
    </div>

    <section id="hon_content" className="hon_content">

      <section id="services" className="hon_section">
        <Grid className="text-center hon_middle_titles">

          <h2>My Skills</h2>
          <h3>From the front-end to the back-end...and beyond!</h3>

            <Row className="hon_icon_boxes">

              <Animated>

                <IconBox icon="package" md={4}>
                  <h4><b>100+</b> Comleted Tasks</h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                </IconBox>

                <IconBox icon="ruler-pencil" md={4}>
                  <h4><b>Great</b> Design</h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                </IconBox>

                <IconBox icon="panel" md={4}>
                  <h4><b>Concepts</b> Marketing</h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                </IconBox>

                <IconBox icon="bag" md={4}>
                  <h4><b>Photoshop</b>Knowledges</h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                </IconBox>

                <IconBox icon="infinite" md={4}>
                  <h4><b>450+</b> Designs</h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                </IconBox>

                <IconBox icon="headphone" md={4}>
                  <h4><b>IT</b>Practice</h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                </IconBox>

              </Animated>

            </Row>

        </Grid>

      </section>

      <section className="hon_section hon_section_sml_padding hon_image_bck text-center hon_wht_txt hon_fixed"
        {...withBackground('http://verothemes.com/hondo/images/corporate3/shutterstock_303925577.jpg')}>

        <Overlay r={41} g={41} b={41} opacity={0.9} />

        <Grid>
          <Row className="hon_icon_boxes">
            <Animated>
              <Statistic name="clients" icon="bar-chart" value={34} />
              <Statistic name="coffee" icon="cup" value={65} />
              <Statistic name="portfolio item" icon="paint-roller" value={55} />
              <Statistic name="contact phone" icon="mobile" value={95} />
            </Animated>
          </Row>

        </Grid>
      </section>

      {/*<Testimonials />*/}
    </section>
  </div>
);

export default About;
