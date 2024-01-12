import { ApplicationEnvironment } from '@/config/types';
import { APP_ENV } from '@/config';

export const isProduction = (): boolean => {
  return APP_ENV === ApplicationEnvironment.PRODUCTION;
};

export const isDevelopment = (): boolean => {
  return APP_ENV === ApplicationEnvironment.DEVELOP;
};

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};
