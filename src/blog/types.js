// @flow

export type url = string;

export type RecentPostType = {
  id: string,
  title: string,
  date: string
}

export type PostMeta = {
  id: string,
  title: string,
  subTitle?: string,
  date: string,
  hero?: url
};

export type PostType = {
  id: string,
  title: string,
  subTitle?: string,
  __content: string,
  date: string,
  hero?: url
};
