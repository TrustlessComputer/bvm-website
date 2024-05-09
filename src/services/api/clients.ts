import { API_BASE_URL } from '@/config';
import createAxiosInstance from './http-client';

export const apiClient = createAxiosInstance({
  baseURL: '/',
});

export const L2ServiceAPI = createAxiosInstance({
  baseURL: API_BASE_URL + '/api',
});

// export const bridgeClient = createAxiosInstance({
//   baseURL: BRIDGES_API_URL,
// });

// export const dexClient = createAxiosInstance({
//   baseURL: DEX_API,
// });
