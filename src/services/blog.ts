import { WP_API_URL } from '@/config';

const BASE_URL = `${WP_API_URL}/wp-json/blog/v1`;

// Fetch related posts by post ID
export async function fetchRelatedPostsById(postId: number): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/related/${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch related posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return { error: error.message };
  }
}

// Fetch single post by ID with view counter update
export async function fetchPostById(postId: number): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/get/${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return { error: error.message };
  }
}

// Fetch all posts with pagination, sorting, and view count
export async function fetchAllPosts(params: { per_page?: number; page?: number; order?: string; orderBy?: string }): Promise<any> {
  const { per_page = 10, page = 1, order = 'desc', orderBy = 'date' } = params;
  try {
    const response = await fetch(`${BASE_URL}/posts?per_page=${per_page}&page=${page}&order=${order}&orderBy=${orderBy}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: error.message };
  }
}
