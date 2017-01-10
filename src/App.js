// @flow
import React from 'react';

import { BrowserRouter, Match } from 'react-router';

import About from './About';
import Blog from './blog';
import Home from './Home';

import Footer from './Footer';
import Header from './Header';
import SocialIcons from './SocialIcons';

import './app.css';

const App = () => (
  <BrowserRouter>
    <div className="hon_middle_titles hon_image_bck hon_material hon_footer_fix" style={{backgroundColor: 'white'}}>

      <SocialIcons />

      <div className="hon_page hon_page_margin hon_page_fixed" id="hon_page">

        {/* Jump to top link */}
        <a href="#hon_page" className="hon_top ti ti-angle-up hon_go"/>

        <Header />

        <Match exactly pattern="/" component={Home} />
        <Match pattern="/about" component={About} />
        <Match pattern="/blog" component={Blog} />

        {/* If none of those match, then a sibling `Miss` will render. */}
        {/*<Miss component={NoMatch}/>*/}

        <Footer />
      </div>
    </div>
  </BrowserRouter>
);


export default App;
