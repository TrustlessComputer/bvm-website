interface Blog {
  id: number;
  title: string;
  excerpt: string;
  view_count: number;
  slug: string;
  author: Author;
  list_thumbnail: string;
  thumbnail: string;
  post_content?: string;
  tags?: Tag[];
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Author {
  avatar: string;
  display_name: string;
  nickname: string;
  author_id: string;
}

interface FetchError {
  error: string;
}

interface Params{
  per_page?: number;
  page?: number;
  order?: string;
  orderBy?: string,
  tag?: string
  author?: string
}
