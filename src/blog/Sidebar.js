// @flow
import React from 'react';
import Col from 'react-bootstrap/lib/Col';

const Sidebar = () => (
  <Col md={3} mdPull={8} xsHidden smHidden>

    <div className="widget">
      <h6 className="title">About The Author</h6>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    <div className="widget">
      <h6 className="title">Search Blog</h6>
      <form>
        <input className="form-control" type="text" placeholder="Enter Your Keywords" />
      </form>
    </div>

    <div className="widget">
      <h6 className="title">Blog Categories</h6>
      <ul className="list-unstyled">
        <li>
          <a href="#">Business</a>
        </li>
        <li>
          <a href="#">Creative</a>
        </li>
        <li>
          <a href="#">Photography</a>
        </li>
        <li>
          <a href="#">Freelance</a>
        </li>
      </ul>
    </div>

    <div className="widget">
      <h6 className="title">Recent Posts</h6>
      <ul className="list-unstyled recent-posts">
        <li>
          <a href="#">Ut enim ad minim veniam, quis nostrud</a>
          <span className="date">November 10, 2016</span>
        </li>
        <li>
          <a href="#">Excepteur sint occaecat</a>
          <span className="date">November 08, 2016</span>
        </li>
        <li>
          <a href="#">Duis aute irure dolor in reprehenderit in voluptate velit</a>
          <span className="date">November 05, 2016</span>
        </li>
      </ul>
    </div>


    <div className="widget bg-secondary p24">
      <h6 className="title">Subscribe Now</h6>
      <p>
        Subscribe to our newsletter.
      </p>
      <form>
        <input type="text" className="form-control" name="email" placeholder="Email Address" />
        <input type="submit" className="btn btn-default no-margin" value="Subscribe" />
      </form>
    </div>

  </Col>
);


export default Sidebar;
