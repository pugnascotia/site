// @flow
import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <header>

    <nav className="hon_light_nav hon_transp_nav grey_header">
      <div className="container">

        <a href="/" className="hon_logo hon_logo_animation">Rory Hunter</a>

        <div className="hon_logo_und">Swiss Army Developer</div>
        <div className="hon_header_login">
          <a href="#" className="btn btn_border hidden-xs">Hire Me</a>
        </div>

        <div className="hon_top_menu_mobile_link">
          <i className="ti ti-menu"/>
        </div>

        <div className="hon_top_menu_cont">
          <ul className="hon_top_menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
          </ul>
        </div>

      </div>
    </nav>

  </header>
);

export default Header;
