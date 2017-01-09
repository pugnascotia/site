// @flow
import React from 'react';

const Footer = () => (
  <footer className="hon_image_bck hon_wht_txt hon_footer_fixed hon_no_shadow" style={{backgroundColor: '#999'}}>
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-3">
          <h4>Blog</h4>
          <ul>
            <li><a href="#">Thomsoon</a></li>
            <li><a href="#">Free mockup</a></li>
            <li><a href="#">No way. New UI elements</a></li>
            <li><a href="#">Thomsoon Shop</a></li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-3">
          <h4>Shop</h4>
          <p>Please Visit Out Shop <br />
            68 Cardamon Place, Melbourne Vic 3000<br />
            Call us: 1.777.77.777
          </p>
        </div>
        <div className="col-md-3 col-sm-3">
          <h4>Social</h4>
          <ul>
            <li><a href="#">Behance</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Dribble</a></li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-3">
          <h3>© Hondo 2016</h3>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
