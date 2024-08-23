import { WP_API_URL } from '@/config';
const AUTH_KEY = process.env.WP_AUTH_BVM_STUDIO_KEY;

const BASE_URL = `${WP_API_URL}/bvm-studio/v1`;

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_KEY}`,
    ...options.headers,
  };

  return fetch(url, { ...options, headers });
}

export async function addDataDrafting( data: IParamsAddDrafting): Promise<void> {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/add-drafting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to add drafting');
    }
  } catch (error) {
    console.error('Error adding drafting:', error);
  }
}

export async function updateDataDrafting( data: IParamsAddDrafting): Promise<void> {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/drafting`, {
      method: 'PUST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update drafting');
    }
  } catch (error) {
    console.error('Error updating drafting:', error);
  }
}

export async function deleteDataDrafting(order_id: string): Promise<void> {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/drafting/${order_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete drafting');
    }
  } catch (error) {
    console.error('Error deleting drafting:', error);
  }
}

export async function getDataDrafting(order_id: string): Promise<IDrafting> {
  try {
    const response = await fetch(`${BASE_URL}/drafting/${order_id}`, {
      method: 'GET',
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch drafting');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching drafting:', error);
    return {} as IDrafting;
  }
}
