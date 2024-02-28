/* eslint-disable @typescript-eslint/no-explicit-any */
import { STORAGE_KEYS } from '@/constants/storage-key';
import { isBrowser } from '@/utils/common';

function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

class LocalStorage {
  public static getItem(key: any) {
    if (!isBrowser()) {
      return null;
    }

    const data: any = localStorage.getItem(key);
    if (data && isJsonString(data)) {
      return JSON.parse(data);
    }
    return data;
  }

  public static setItem(key: STORAGE_KEYS, data: unknown) {
    if (!isBrowser()) {
      return;
    }

    if (isJsonString(data)) {
      const json = JSON.stringify(data);
      localStorage.setItem(key, json);
    }
    localStorage.setItem(key, data as any);
  }

  public static removeItem(key: STORAGE_KEYS) {
    if (!isBrowser()) {
      return;
    }

    localStorage.removeItem(key);
  }

  public static clear() {
    if (!isBrowser()) {
      return;
    }

    localStorage.clear();
  }
}

export default LocalStorage;
