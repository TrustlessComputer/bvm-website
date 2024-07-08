export type TPagination = {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  }
}

export type TBlog = TPagination & {
  title: string,
  desc: string,
  slug: string,
  category: string,
  updateTime: string,
  view: number,
  thumbnail: string,
};

export type TBlogDetail = {
  title: string,
  category: string,
  updateTime: string,
  content: string,
  view: number,
  excerpt: string,

  thumbnail: string,
  author: {
    name: string,
    avatar: string
  },
};
