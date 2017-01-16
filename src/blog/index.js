// @flow
import React from 'react';
import { Match } from 'react-router';
import asyncPost from './asyncPost';

import type { PostMeta } from './types';

import postMeta from './collection.json';

const allPosts : string[] = postMeta.posts;
const recentPosts : PostMeta[] = postMeta.recent;

type Props = {
  pathname: string
};

const Blog = ({ pathname }: Props) => (
  <div>
    <Match pattern={pathname} exactly render={() => {
      const PostWrapper = asyncPost(allPosts[0]);
      return <PostWrapper recentPosts={recentPosts} />
    }} />

    <Match pattern={`${pathname}/:postId`} render={({ params: { postId } }) => {
      if (allPosts.includes(postId)) {
        const PostWrapper = asyncPost(postId);
        return <PostWrapper recentPosts={recentPosts} />;
      }

      return <h1>I could not find that post. 404, dude.</h1>;
    }}/>

  </div>
);

export default Blog;
