import { ApplicationEnvironment } from '@/config/types';
import { APP_ENV } from '@/config';

const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const isProduction = (): boolean => {
  return APP_ENV === ApplicationEnvironment.PRODUCTION;
};

export { isBrowser };
