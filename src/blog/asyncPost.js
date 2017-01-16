// @flow
import React from 'react';

import Post from './Post';

const asyncPost = (slug) => {
  if (typeof window === 'undefined') {
    const data = require('./' + slug + '.md');
    return (props) => <Post post={data} {...props} />;
  }

  return class extends React.Component {
    componentWillMount() {
      if (!this.state) {
        require.ensure([], (require) => {
          const post = require('./posts/' + slug + '.md');
          this.setState({ post });
        });
      }
    }

    render() {
      const post = this.state ? this.state.post : null;
      return post ? <Post post={post} {...this.props} /> : null;
    }
  };
};

export default asyncPost;
