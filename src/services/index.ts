import createAxiosInstance from "./http-client";

// Can create multiple axios instances with different base URL
export const apiClient = createAxiosInstance({ baseURL: 'https://dapp.trustless.computer/dapp/api' });
