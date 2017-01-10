// @flow
import React from 'react';
import { Match } from 'react-router';

import Post from './Post';

import type { PostType, RecentPostType } from './types';

// $FlowFixMe it doesn't know about Webpack extras on require()
const markdownRequire : (string) => PostType = require.context('./posts', /* useSubdirectories = */ true, /* regExp = */ /\.md$/);

const allPosts : PostType[] = markdownRequire.keys()
  .map(id => ({ id, ...markdownRequire(id) }))
  .sort((a, b) => a.date.localeCompare(b.date) < 0);

const latestPost = allPosts[0].id;

const recentPosts : RecentPostType[] = allPosts.slice(0, 5).map(post => ({
  id: post.id,
  title: post.title,
  date: post.date
}));

type Props = {
  pathname: string
};

const Blog = ({ pathname }: Props) => (
  <div>

    <Match pattern={pathname} exactly render={() =>
      <Post post={markdownRequire(latestPost)} recentPosts={recentPosts} /> }/>

    <Match pattern={`${pathname}/:postId`} render={({ params }) => {
      try {
        return <Post post={markdownRequire(`./${params.postId}.md`)} recentPosts={recentPosts} />
      }
      catch (e) {
        return <h1>I could not find that post. 404, dude.</h1>;
      }
    }}/>

  </div>
);

export default Blog;
