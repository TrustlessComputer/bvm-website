interface Blog {
  id: number;
  title: string;
  excerpt: string;
  view_count: number;
  slug: string;
  author: Author;
  list_thumbnail: string;
  thumbnail: string;
  date: string;
  post_content?: string;
  keywords?: string;
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

interface Params {
  per_page?: number;
  page?: number;
  order?: string;
  orderBy?: string,
  tag?: string
  author?: string
}

interface Posts {
  data: Blog[],
  total: number,
  page: number,
  per_page: number,
}
