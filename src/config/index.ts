import { default as MetadataConfig } from './metadata';
import { default as ViewportConfig } from './viewport';

export const APP_ENV: string = process.env.NEXT_PUBLIC_APP_ENV!;
export const API_UR: string = process.env.NEXT_PUBLIC_API_URL!;
export const DOMAIN_URL: string = process.env.NEXT_PUBLIC_DOMAIN_URL!;
export const CDN_URL: string = process.env.NEXT_PUBLIC_CDN_URL!;

export const CDN_URL_ICONS: string = CDN_URL + '/nbc/icons';

export { MetadataConfig, ViewportConfig };
