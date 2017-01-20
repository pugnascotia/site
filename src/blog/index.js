// @flow
import React from 'react';
import { Match } from 'react-router';

import Post from './Post';
import type { PostType, RecentPostType } from './types';

import postMeta from './collection.json';

const recentPosts : RecentPostType [] = postMeta.recent;

type Props = {
  pathname: string
};

const getPost = (id) => {
  // $FlowFixMe$
  const post : PostType = require(`./posts/${id}.md`);
  return <Post post={post} recentPosts={recentPosts} />;
};

const Blog = ({ pathname }: Props) => (
  <div>
    <Match pattern={pathname} exactly render={() => getPost(recentPosts[0].id)} />

    <Match pattern={`${pathname}/:postId`} render={({ params: { postId } }) => {
      try {
        return getPost(postId);
      }
      catch (e) {
        return <h1>I could not find that post. 404, dude.</h1>;
      }
    }}/>

  </div>
);

export default Blog;
