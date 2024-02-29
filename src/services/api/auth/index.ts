/* eslint-disable @typescript-eslint/no-explicit-any */
import { STORAGE_KEYS } from '@/constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { L2ServiceAPI as apiClient } from '@/services/api/clients';
import qs from 'query-string';
import { UserProfile } from './types';

const getHeaderDefault = () => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
  };
  return headers;
};

export const getChallenge = async (address: string): Promise<string> => {
  const query = qs.stringify({
    address,
  });
  const res = await apiClient.get(`/api/auth/challenge?${query}`);
  console.log('getChallenge', res);
  return res as any;
};

export const verifyChallenge = async (
  signature: string,
  address: string,
): Promise<string> => {
  const query = qs.stringify({
    signature: signature.startsWith('0x')
      ? signature.replace('0x', '')
      : signature,
    address,
  });
  const res = await apiClient.get(`/api/auth/verify?${query}`);
  console.log('verifyChallenge', res);
  return res as any;
};

export const revokeAuthentication = async (): Promise<void> => {
  const res = await apiClient.post(`/api/auth/revoke`);
  console.log('revokeAuthentication', res);
};

// ------------------------------------------------------------
// Eternal AI API
// ------------------------------------------------------------

export const getAPIAcessToken = () => {
  return LocalStorage.getItem(STORAGE_KEYS.API_ACCESS_TOKEN);
};

export const register = async (idToken: string): Promise<any> => {
  console.log('[API][register] idToken', idToken);
  try {
    const res = await apiClient.get(`/api/account/register`, {
      headers: {
        ...getHeaderDefault(),
        Authorization: `${idToken}`,
      },
    });
    console.log('[API][register] res', res);
    return res as any;
  } catch (error) {
    console.log('[API][register] ERROR', error);
    throw error;
  }
};

export const getProfile = async (): Promise<UserProfile> => {
  console.log('[API][getProfile] --- ');
  try {
    const res = await apiClient.get(`/api/account/profile`, {
      headers: {
        ...getHeaderDefault(),
        Authorization: getAPIAcessToken(),
      },
    });

    console.log('[API][getProfile] res --- ', res);
    return res as any;
  } catch (error) {
    console.log('[API][register] ERROR', error);
    throw error;
  }
};

export const L2Service = {
  register,
  getProfile,
};
