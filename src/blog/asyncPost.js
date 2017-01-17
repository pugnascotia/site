// @flow
import React from 'react';

import Post from './Post';

const asyncPost = (slug) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { props: null };
    }

    componentWillMount() {
      if (!this.state) {
        const waitForPost = require('./posts/' + slug + '.md');
        waitForPost((post) => this.setState({ post }));
      }
    }

    render() {
      const { post } = this.state;
      return post ? <Post post={post} {...this.props} /> : null;
    }
  };
};

export default asyncPost;
