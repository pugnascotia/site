// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import Animated from '../components/Animated';
import IconBox from '../components/IconBox';
import Metric from '../components/Metric';

import { withBackground } from '../StyleUtils';

const SkillBar = ({percentage, skill, delay = '0s'}) => (
  <div className="skill-bar skill-bar-thin" style={{ transitionDelay: delay }}>
    <div className="skill-bar-content" data-percentage={percentage} style={{width: `${percentage}%`}}></div>
    <span className="skill-title">{skill}</span><span className="skill-perc">{percentage}%</span>
  </div>
);

const Education = ({institution, outcome, dark, children}) => (
  <Col md={4} sm={6} className={`hon_icon_box ${dark ? 'hon_wht_txt' : 'hon_no_shadow'}`}>
    <div className={`hon_price_bl ${dark ? 'hon_image_bck' : ''}`} style={{backgroundColor: dark ? '#999' : 'inherit'}}>
      <h4>{institution}</h4>
      {children}
      <br />
      <a href="#" className="btn">{outcome}</a>
    </div>
  </Col>
);

const App = () => (
  <div className="hon_material hon_middle_titles">

    {/* Slider */}
    <div className="hon_slider hon_image_bck hon_fixed hon_wht_txt"
      {...withBackground('http://verothemes.com/hondo/images/about/sl.jpg')}
    >
      <div className="hon_over" style={{backgroundColor: 'rgba(0,0,0,0.2)'}} data-0="opacity:0.1;" data--400-bottom="opacity:0;"></div>

      <div className="container">

        {/* Slider Texts */}
        <div className="hon_slide_txt text-left hon_txt_mt"  data-0="opacity:1;" data--200-bottom="opacity:0;">

          {/* Large Medium TXT Devices */}
          <div className="hon_wrapper_full_sl hon_wht_txt  hidden-xs hidden-sm">
            <h2 className="hon_sentence">
              <span>Real work is like</span>
              <br />
              <span>creating</span>
              <div className="hon_words hon_words_1">
                <span>breathtaking moments</span>
                <span>happy people</span>
                <span>incredible trust</span>
                <span>unseen experiences</span>
                <span>stable feelings</span>
                <span>beautiful world</span>
              </div>
              <br />
              <span>with a silent touch of</span>
              <div className="hon_words hon_words_2">
                <span>reliability</span>
                <span>loyalty</span>
                <span>uniques</span>
                <span>happiness</span>
                <span>wonder</span>
                <span>stability</span>
              </div>
            </h2>
          </div>
          {/* Large Medium TXT Devices End */}

          {/* Small TXT Devices */}
          <div className="hon_slide_title hidden-md hidden-lg">
            We believe in
          </div>
          <div className="hon_wrapper_slider  hidden-md hidden-lg">
            <div className="hon_slide_title hon_sentence">
              <div className="hon_words hon_words_1">
                <span>reliability</span>
                <span>loyalty</span>
                <span>uniques</span>
                <span>happiness</span>
                <span>wonder</span>
                <span>stability</span>
              </div>

            </div>
          </div>
            {/* Small TXT Devices End */}
          <a href="#" className="btn btn_border">Read more</a>
          <a href="https://themeforest.net/user/verothemes/portfolio?ref=VeroThemes" className="btn" >Hire Me</a>
        </div>
        {/* Slider Texts End */}

      </div>
      {/* container end */}


    </div>
    {/* Slider End */}

    {/* Content */}
    <section id="hon_content" className="hon_content">

      {/* section */}
      <section className="hon_section hon_image_bck" style={{backgroundColor: '#fff'}}>
        <div className="container">

          <Row>
            <Col md={4}>
              <img src="http://verothemes.com/hondo/images/about/sl.jpg" />
              <p/>
              <h2>WHO AM I?</h2>
              <p>We Love what we create. Whether it's a new brand identity, advertising campaign or interactive strategy.
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur magnam, quo dolor recusandae magni
                nostrum ipsum!</p>
                <p><a href="#" className="btn">Download CV</a>
              </p>
            </Col>

            <Col md={7} mdOffset={1} className="hon_txt_gradient">

              {/* icon boxes */}
              <Row>

                <Animated>

                  <IconBox icon="package">
                    <h4><b>100+</b> page templates</h4>
                    Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                  </IconBox>

                  <IconBox icon="ruler-pencil">
                    <h4><b>Great</b> Design</h4>
                    Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                  </IconBox>

                  <IconBox icon="panel">
                    <h4><b>Consepts</b> Marketing</h4>
                    Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                  </IconBox>

                  <IconBox icon="bag">
                    <h4><b>One/Multi</b> Development</h4>
                    Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                  </IconBox>

                </Animated>

              </Row>
              {/* icon boxes end */}
            </Col>
          </Row>

          <Row className="hon_icon_boxes text-center">

            <Animated>
              <Metric name="Happy Clients" value={820} />
              <Metric name="Project Completed" value={1200} />
              <Metric name="Cups of Coffee" value={390} />
              <Metric name="Award Winning" value={188} />
            </Animated>
          </Row>

        </div>
        {/* container end */}

      </section>
      {/* section end */}


      {/* section */}
      <section className="hon_section hon_section_sml_padding bg"
        {...withBackground('http://verothemes.com/hondo/images/about/slide1.jpg')}>

        <div className="row hon_auto_height hon_wht_txt">

          <div className="col-md-6 hon_image_bck" style={{backgroundColor: '#999'}}>
            <div className="hon_simple_block">
              <h2>Welcome to Marko World</h2>
              <h3>HOW CAN I HELP YOU</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quas alias reiciendis aperiam maiores excepturi quia minima, perferendis recusandae, ipsum non harum autem, explicabo suscipit ipsa dignissimos adipisci nulla, animi.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quas alias reiciendis aperiam maiores excepturi quia minima, perferendis recusandae, ipsum non harum autem, explicabo suscipit ipsa dignissimos adipisci nulla, animi.</p>

              <p><a href="#" className="btn">Read More</a></p>
            </div>
          </div>
        </div>


      </section>
      {/* section end */}

      {/* section */}
      <section className="hon_section hon_section_sml_padding hon_image_bck hon_wht_txt bg"
        {...withBackground('http://verothemes.com/hondo/images/about/work.jpg')}>

        <div className="row hon_auto_height">

          <div className="col-md-6 col-md-offset-6 hon_image_bck" style={{backgroundColor: '#999'}}>
            <div className="hon_simple_block">

              {/* boxes */}
              <div className="row">

                <Animated>

                  <div className="hon_icon_box col-md-6 col-sm-6">
                    <i className="ti ti-target"/>
                    <div className="hon_icon_box_content">
                      <h4><b>Mission</b> Vision</h4>
                      Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                    </div>
                  </div>

                    {/* item */}
                  <div className="hon_icon_box col-md-6 col-sm-6">
                    <i className="ti ti-tablet"/>
                    <div className="hon_icon_box_content">
                      <h4><b>Vision</b> 2020</h4>
                      Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                    </div>
                  </div>

                    {/* item */}
                  <div className="hon_icon_box col-md-6 col-sm-6">
                    <i className="ti ti-paint-bucket"/>
                    <div className="hon_icon_box_content">
                      <h4><b>Settings</b> Service</h4>
                      Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                    </div>
                  </div>

                    {/* item */}
                  <div className="hon_icon_box col-md-6 col-sm-6">
                    <i className="ti ti-heart"/>
                    <div className="hon_icon_box_content">
                      <h4><b>Applications</b> crafting </h4>
                      Lorem ipsum dolor sit amet, consectetur adipisicingelit, sed do
                    </div>
                  </div>

                </Animated>

              </div>
              {/* boxes end */}
            </div>
          </div>
        </div>


      </section>
      {/* section end */}


      {/* section */}
      <section className="hon_section hon_image_bck" style={{backgroundColor: '#fff'}}>
        <div className="container text-center">

          <h2>My Works</h2>
          <h3>We are a company of promise and possibilities. Each day represents a fresh oppurtunity to share Our Vision.
           Joining strategy with creative is what we do best as our goal is to create tools that engage
            your audience and entice them to act.</h3>


          {/* icon boxes */}
          <Row className="hon_icon_boxes hon_slide_gallery hon_gravity">

            {/* item */}
            <div className="hon_portfolio_gravity">

              <div className="hon_gravity_content" >
                <img src="http://placehold.it/600x400" alt="" />
                <div className="hon_gravity_title text-left">
                  <h3>Hondo</h3>
                  <span className="hon_port_subtitle">Design / Modern / Nature</span>
                  <span className="hon_gravity_icons">
                    <a href="http://placehold.it/600x400" className="lightbox"><i className="ti ti-plus"/></a>
                  </span>
                </div>

              </div>
            </div>

            {/* item */}
            <div className="hon_portfolio_gravity">

              <div className="hon_gravity_content">
                <img src="http://placehold.it/600x400" alt="" />
                <div className="hon_gravity_title text-left">
                  <h3>Business</h3>
                  <span className="hon_port_subtitle">Design / Modern / Nature</span>
                  <span className="hon_gravity_icons">
                    <a href="http://placehold.it/600x400" className="lightbox"><i className="ti ti-plus"/></a>
                  </span>
                </div>

              </div>
            </div>


            {/* item */}
            <div className="hon_portfolio_gravity">

              <div className="hon_gravity_content">
                <img src="http://placehold.it/600x400" alt="" />
                <div className="hon_gravity_title text-left">
                  <h3>World</h3>
                  <span className="hon_port_subtitle">Design / Modern / Nature</span>
                  <span className="hon_gravity_icons">
                    <a href="http://placehold.it/600x400" className="lightbox"><i className="ti ti-plus"/></a>
                  </span>
                </div>


              </div>
            </div>

            {/* item */}
            <div className="hon_portfolio_gravity">

              <div className="hon_gravity_content">

                <img src="http://placehold.it/600x400" alt="" />
                <div className="hon_gravity_title text-left">
                  <h3>Welcome to Hondo</h3>
                  <span className="hon_port_subtitle">Design / Modern / Nature</span>
                  <span className="hon_gravity_icons">
                    <a href="http://placehold.it/600x400" className="lightbox"><i className="ti ti-plus"/></a>
                  </span>
                </div>

              </div>
            </div>


          </Row>
          {/* icon boxes end */}


        </div>
        {/* container end */}

      </section>

      <section className="hon_section hon_section_sml_padding" >

        <Row className="hon_auto_height">

          <div className="col-md-4 hon_image_bck hon_wht_txt" style={{backgroundColor: '#999'}}>
            <div className="hon_simple_block hon_middle_title">
              <h3>Marko will help to market your startup</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat voluptates adipisci beatae eos! Eveniet rem nam dolore iusto quas. Consectetur perferendis, nobis rerum quos rem libero ea temporibus doloribus.</p>
            </div>
          </div>

          <div className="col-md-4 hidden-sm hon_image_bck hon_fixed"  data-stellar-background-ratio="0.2"
               style={{backgroundImage: 'url(http://verothemes.com/hondo/images/about/sl_2.jpg)'}}>

          </div>
          <div className="col-md-4 hon_image_bck hon_wht_txt" style={{backgroundColor: '#999'}}>
            <div className="hon_simple_block">

              <Animated>
                <SkillBar skill="WEB DESIGN" percentage={80} />
                <SkillBar skill="HTML / CSS" percentage={90} />
                <SkillBar skill="WORDPRESS" percentage={85} />
                <SkillBar skill="SEO" percentage={75} />
              </Animated>

            </div>
          </div>
        </Row>

      </section>

      <section className="hon_section hon_image_bck" style={{backgroundColor: '#fff'}}>
        <Grid className="text-center">

          <h2>My Education</h2>
          <h3>We are a company of promise and possibilities. Each day represents a fresh oppurtunity to share Our Vision.
           Joining strategy with creative is what we do best as our goal is to create tools that engage your audience
           and entice them to act.</h3>

          <Row className="hon_icon_boxes">

            <Animated>

              <Education institution="AUSTRIAN STATE COLLEGE" outcome="GRADE A+">
                <ul>
                  <li><b>4</b> Years</li>
                  <li><b>Bachelor</b> Arts</li>
                  <li><b>1000+</b> Esseys</li>
                  <li><b>5 Months</b> Practice</li>
                </ul>
              </Education>

              <Education dark institution="Europian STATE COLLEGE" outcome="GRADE A+">
                <ul>
                  <li><b>4</b> Years</li>
                  <li><b>Bachelor</b> Arts</li>
                  <li><b>1000+</b> Esseys</li>
                  <li><b>5 Months</b> Practice</li>
                </ul>
              </Education>

              <Education institution="Boston STATE University" outcome="GRADE A+">
                <ul>
                  <li><b>4</b> Years</li>
                  <li><b>Bachelor</b> Arts</li>
                  <li><b>1000+</b> Esseys</li>
                  <li><b>5 Months</b> Practice</li>
                </ul>
              </Education>

            </Animated>

          </Row>
          {/* icon boxes end */}

        </Grid>

      </section>

    </section>
  </div>
);

export default App;
