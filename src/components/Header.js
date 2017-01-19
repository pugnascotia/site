// @flow
import React from 'react';
import { Link } from 'react-router';

const Logo = ({ text }) => {
  const letters = text.split('').map((each, index) => {
    const min = 0;
    const max = 50;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    return (<span key={index} style={{ transitionDelay: `0.${randomNumber}s` }}>{each}</span>);
  });

  return (
    <Link to="/" className="hon_logo hon_logo_animation">
      {letters}
    </Link>
  );
};

const Header = () => (
  <header>

    <nav className="hon_light_nav hon_transp_nav grey_header">
      <div className="container">

        <Logo text="pugnascotia" />

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
