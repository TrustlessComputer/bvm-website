export type TPagination = {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  }
}

export type TBlog = {
  id: number,
  title: string,
  excerpt: string,
  content: string,
  view_count: number,
  slug: string,
  thumbnail: string,
  list_thumbnail: string,
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
  thumbnail: string,
  list_thumbnail: string,

  category: string,
  updateTime: string,



};
