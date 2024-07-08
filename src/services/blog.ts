import { WP_API_URL } from '@/config';

const BASE_URL = `${WP_API_URL}/wp-json/blog/v1`;

// Fetch related posts by post ID
export async function fetchRelatedPostsById(postId: number): Promise<Blog[]> {
  try {
    const response = await fetch(`${BASE_URL}/related/${postId}`, {
      method: 'GET',
      cache: 'force-cache'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch related posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Fetch single post by ID with view counter update
export async function fetchPostById(postId: number): Promise<Blog | null> {
  try {
    const response = await fetch(`${BASE_URL}/get/${postId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch all posts with pagination, sorting, and view count
export async function fetchAllPosts(params: {
  per_page?: number;
  page?: number;
  order?: string;
  orderBy?: string,
  tag?: string
  author?: string
}): Promise<Blog[]> {

  const { per_page = 10, page = 1, order = 'desc', orderBy = 'date', tag, author } = params;

  // Construct query parameters dynamically
  const queryParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
    order,
    orderBy,
  });

  if (tag) {
    queryParams.append('tag', tag);
  }

  if (author) {
    queryParams.append('author', author);
  }

  const url = `${BASE_URL}/posts?${queryParams.toString()}`;

  console.log('____url', url);
  try {

    const response = await fetch(url, { method: 'GET', cache: 'force-cache' });
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
