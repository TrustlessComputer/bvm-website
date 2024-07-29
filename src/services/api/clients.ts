import { API_BASE_URL, API_ETERNAL_AI, DA_SERVICE_URL } from '@/config';
import createAxiosInstance from './http-client';

export const apiClient = createAxiosInstance({
  baseURL: '/',
});

export const L2ServiceAPI = createAxiosInstance({
  baseURL: API_BASE_URL + '/api',
});

export const DAServiceAPI = createAxiosInstance({
  baseURL: DA_SERVICE_URL + '/api',
});

export const apiEternalAIClient = createAxiosInstance({
  baseURL: API_ETERNAL_AI + '/api',
});

// export const bridgeClient = createAxiosInstance({
//   baseURL: BRIDGES_API_URL,
// });

// export const dexClient = createAxiosInstance({
//   baseURL: DEX_API,
// });
