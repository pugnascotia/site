// @flow
import React from 'react';

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
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
          </ul>
        </div>

      </div>
    </nav>

  </header>
);

export default Header;
