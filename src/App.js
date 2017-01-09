// @flow
import React from 'react';

// 1. import a few components
import { BrowserRouter, Match, Miss, Link } from 'react-router';

import About from './About';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import SocialIcons from './SocialIcons';

const App = () => (
  // 2. render a `Router`, it will listen to the url changes
  //    and make the location available to other components
  //    automatically
  <BrowserRouter>
    <div className="hon_middle_titles hon_image_bck hon_material hon_footer_fix" style={{backgroundColor: '#eee'}}>

      <SocialIcons />

      {/* Page */}
      <div className="hon_page hon_page_margin hon_page_fixed" id="hon_page">

        {/* To Top */}
        <a href="#hon_page" className="hon_top ti ti-angle-up hon_go"/>

        <Header />

        {/*
          * 4. Render some `<Match/>` components.
          * When the current location matches the `pattern`
          * then the `component` will render.
          */}
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/about" component={About} />
        {/*<Match pattern="/topics" component={Topics} />*/}

        {/* If none of those match, then a sibling `Miss` will render. */}
        {/*<Miss component={NoMatch}/>*/}

        <Footer />
      </div>
    </div>
  </BrowserRouter>
);


export default App;
