export type TPagination = {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  }
}

export type TBlog = TPagination & {
  id: number,
  title: string,
  excerpt: string,
  content: string,
  view_count: number,
  slug: string,
  author: {
    nickname: string,
    display_name: string,
    avatar: string
  },

};

export type TBlogDetail = {
  id: number,
  title: string,
  content: string,
  view_count: number,
  excerpt: string,
  slug: string,
  author: {
    nickname: string,
    display_name: string,
    avatar: string
  },

  category: string,
  updateTime: string,

  thumbnail: string,

};
