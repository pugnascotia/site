// @flow
import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import Sidebar from './Sidebar';
import Header from './Header';

type Props = {
  title: string,
  subTitle?: string,
  __content: string,
  date: string
};

const Post = ({ title, subTitle, __content, date}: Props) => {

  const parsedDate = new Date(date);

  return (
    <div>
      <Header title={title} subTitle={subTitle} />

      <section id="hon_content" className="hon_content">
        <section className="hon_section">
          <Grid>
            <Row>
              <Col md={8} xs={12} mdPush={4}>

                <div className="hon_post_info">
                  {parsedDate.toUTCString()}
                </div>

                <div dangerouslySetInnerHTML={{__html: __content}} />

                {/*  Comments  */}
                <section className="comments clearfix">
                  <div className="comments-title">
                    <h3 className="title">Comments</h3>
                  </div>
                  <div className="comments-content">

                    <div className="answer">
                      <img className="img-comments" src="http://placehold.it/600x400" alt=""/>
                      <div className="content-cmt">
                        <span className="name-cmt">Jonh Doe</span>
                        <span className="date-cmt">September 16, 2015</span>
                        <span><a href="#">Reply</a></span>
                        <p className="content-reply">
                          Quisque sed metus eu nunc gravida euismod. Vivamus consequat sapien ut tempus hendrerit. Sed blandit vehicula urna sed posuere.
                          Praesent commodo,
                        </p>
                      </div>
                    </div>

                    <div className="reply">
                      <img className="img-comments" src="http://placehold.it/600x400" alt=""/>
                      <div className="content-cmt">
                        <span className="name-cmt">Jonh Doe</span>
                        <span className="date-cmt">September 16, 2015</span>
                        <span><a href="#">Reply</a></span>
                        <p className="content-reply">
                          Quisque sed metus eu nunc gravida euismod. Vivamus consequat sapien ut tempus hendrerit. Sed blandit vehicula urna sed posuere.
                          Praesent commodo,
                        </p>
                      </div>
                    </div>
                    <div className="answer">
                      <img className="img-comments" src="http://placehold.it/600x400" alt=""/>
                      <div className="content-cmt">
                        <span className="name-cmt">Jonh Doe</span>
                        <span className="date-cmt">September 16, 2015</span>
                        <span><a href="#">Reply</a></span>
                        <p className="content-reply">
                          Quisque sed metus eu nunc gravida euismod. Vivamus consequat sapien ut tempus hendrerit. Sed blandit vehicula urna sed posuere.
                          Praesent commodo,
                        </p>
                      </div>
                    </div>
                    <section className="form-comment">
                      <div className="form-comment-title">
                        <h3 className="title">Leave a Comments</h3>
                      </div>
                      <form id="form-comment" className="form-validate" method="post">
                        <Row>
                          <Col sm={12}>
                            <Row>
                              <Col sm={6}>
                                <div className="name">
                                  <input type="text" placeholder="Your Name" name="name" className="form-control" />
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="mail">
                                  <input type="email" placeholder="Your Email" name="email" className="form-control" />
                                </div>
                              </Col>
                            </Row>

                            <div className="row">
                              <Col sm={6}>
                                <div className="website">
                                  <input type="text" placeholder="Your Website" name="website" className="form-control" />
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="title">
                                  <input type="text" placeholder="Title" name="title" className="form-control" />
                                </div>
                              </Col>
                            </div>

                          </Col>

                          <Col sm={12}>
                            <div className="message">
                              <textarea placeholder="Your Message" rows="8" className="control form-control" id="message" name="message"/>
                            </div>
                          </Col>

                          <Col xs={12}>
                            <div className="form-submit">
                              <input type="submit" value="Submit Comment" className="btn-submit btn-default btn" name="submit" />
                            </div>
                          </Col>

                        </Row>
                      </form>

                    </section>
                  </div>
                </section>
                {/* End Comments  */}

              </Col>

              <Sidebar />

            </Row>
          </Grid>
        </section>
      </section>

    </div>
  );
};

export default Post;
