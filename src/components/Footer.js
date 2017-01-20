// @flow
import React from 'react';
import { Link } from 'react-router';

import type { RecentPostType } from '../blog/types';

import postMeta from '../blog/collection.json';

const recentPosts : RecentPostType[] = postMeta.recent;

const Footer = () => (
  <footer className="hon_image_bck hon_wht_txt hon_footer_fixed hon_no_shadow" style={{backgroundColor: '#999'}}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <h4>Blog</h4>
          <ul>
            {recentPosts.map((post, index) => (
              <li key={index}><Link to={`/blog/${post.id}`}>{post.title}</Link></li>
            ))}
          </ul>
        </div>
        <div className="col-sm-3">
          <h4>Social</h4>
          <ul>
            <li><a href="https://twitter.com/pugnascotia">Twitter</a></li>
            <li><a href="https://github.com/pugnascotia">Github</a></li>
          </ul>
        </div>
        <div className="col-sm-3">
          <h3>© Rory Hunter {new Date().getFullYear()}</h3>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
