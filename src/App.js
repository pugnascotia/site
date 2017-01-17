// @flow
import React from 'react';

import { BrowserRouter, Match } from 'react-router';

import About from './about';
import Blog from './blog';
import Home from './home';

import Footer from './components/Footer';
import Header from './components/Header';
import SocialIcons from './components/SocialIcons'
import scrollToTop from './components/ScrollToTop';

import './app.css';

const App = () => (
  <BrowserRouter>
    <div className="hon_image_bck hon_material hon_footer_fix" style={{backgroundColor: 'white'}}>

      <SocialIcons />

      <div className="hon_page hon_page_fixed">

        <a className="hon_top ti ti-angle-up hon_go" onClick={() => window.scrollTo(0,0) }/>

        <Header />

        <Match exactly pattern="/" component={scrollToTop(Home)} />
        <Match pattern="/about" component={scrollToTop(About)} />
        <Match pattern="/blog" component={scrollToTop(Blog)} />

        {/* If none of those match, then a sibling `Miss` will render. */}
        {/*<Miss component={NoMatch}/>*/}

        <Footer />
      </div>
    </div>
  </BrowserRouter>
);


export default App;
