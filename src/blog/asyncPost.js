// @flow
import React from 'react';

import Post from './Post';

type State = {
  post: any
};

const asyncPost = (slug: string) => {
  return class extends React.Component {
    state: State;

    constructor(props: Object) {
      super(props);
      this.state = { post: null };
    }

    componentWillMount() {
      if (!this.state.post) {
        // $FlowFixMe
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
