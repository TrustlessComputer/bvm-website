import { WP_API_URL } from '@/config';

const BASE_URL = `${WP_API_URL}/bvm-studio/position/v1`;

// Fetch related posts by post ID
export async function getPositionsByOrderId(orderId: string): Promise<BoxItemPosition[]> {
  try {
    const response = await fetch(`${BASE_URL}/get-list/${orderId}`, {
      method: 'GET',
      cache: 'force-cache',
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

export async function updatePositionsByOrderId(orderId: string, positions: BoxItemPosition[]): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/update-list/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(positions),
    });
    if (!response.ok) {
      throw new Error('Failed to update related posts');
    }
  } catch (error) {
    console.error('Error updating related posts:', error);
  }
}

export async function deletePositionsByOrderId(orderId: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/delete-list/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete related posts');
    }
  } catch (error) {
    console.error('Error deleting related posts:', error);
  }
}

export async function getPositionItemById(id: number): Promise<BoxItemPosition | null> {
  try {
    const response = await fetch(`${BASE_URL}/get-item/${id}`, {
      method: 'GET',
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch related posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return null;
  }
}

export async function updatePositionItemById(id: number, position: BoxItemPosition): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/update-item/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(position),
    });
    if (!response.ok) {
      throw new Error('Failed to update related posts');
    }
  } catch (error) {
    console.error('Error updating related posts:', error);
  }
}

export async function  deletePositionItemById(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/delete-item/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete related posts');
    }
  } catch (error) {
    console.error('Error deleting related posts:', error);
  }
}
