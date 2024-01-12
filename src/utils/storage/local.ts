import { isBrowser } from '@/utils/common';

export class LocalStorageService {
  set(key: string, data: unknown): void {
    if (!isBrowser()) {
      return;
    }

    if (isJsonString(data)) {
      const json = JSON.stringify(data);
      return localStorage.setItem(key, json);
    } else {
      return localStorage.setItem(key, data as any);
    }
  }

  setString(key: string, data: string): void {
    if (!isBrowser()) {
      return;
    }
    return localStorage.setItem(key, data);
  }

  get<T>(key: string): T | null {
    if (!isBrowser()) {
      return null;
    }

    const data: any = localStorage.getItem(key);
    if (data && isJsonString(data)) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  remove(key: string): void {
    if (!isBrowser()) {
      return;
    }

    return localStorage.removeItem(key);
  }
}

function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const instance = new LocalStorageService();

export default instance;
