// @flow
import React from 'react';

import { Match } from 'react-router';

import Post from './Post';

// $FlowFixMe it doesn't know about Webpack extra's on require()
const markdownRequire = require.context('./posts', /* useSubdirectories = */ true, /* regExp = */ /\.md$/);

const allPosts = markdownRequire.keys();
const allPostIds = allPosts.map(x => x.replace(new RegExp('^\\.\\/'), '').replace(/\.md$/, ''));

const findLatestPost = () => {
  const mostRecentPost = allPosts
    .map(id => { const data = markdownRequire(id); return { id, date: data.date }; })
    .reduce((cur, next) => cur.date.localeCompare(next.date) < 0 ? next : cur);

  return mostRecentPost.id;
};

const latestPost = findLatestPost();

type Props = {
  pathname: string
};

const Blog = ({ pathname }: Props) => (
  <div>

    {/* HACK to match trailing slash - should I use a redirect? */}
    <Match pattern={pathname} exactly render={() => <Post {...markdownRequire(latestPost)} /> }/>
    <Match pattern={`${pathname}/`} exactly render={() => <Post {...markdownRequire(latestPost)} /> }/>

    <Match pattern={`${pathname}/:postId`} render={({ params }) => {
      if (allPostIds.includes(params.postId)) {
        return <Post {...markdownRequire(`./${params.postId}.md`)} />
      }
      else {
        return <h1>I could not find your post. 404, dude.</h1>;
      }
    }}/>

  </div>
);

export default Blog;
