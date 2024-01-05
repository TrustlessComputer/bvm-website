import { default as MetadataConfig } from './metadata';
import { default as ViewportConfig } from './viewport';

export const APP_ENV: string = process.env.NEXT_PUBLIC_APP_ENV!;
export const API_UR: string = process.env.NEXT_PUBLIC_API_URL!;
export const DOMAIN_URL: string = process.env.NEXT_PUBLIC_DOMAIN_URL!;

export const CDN_URL: string = process.env.NEXT_PUBLIC_CDN_URL!;

export const isProduction: boolean = APP_ENV === 'production';
export const isDevelop: boolean = APP_ENV === 'develop';
export const isLocal: boolean = APP_ENV === 'local';

export const CDN_URL_ICONS: string = CDN_URL + '/nbc/icons/bvm-icons';
export const CDN_APP_ICON_URL: string = CDN_URL + '/l2aas/icons';

export const NEW_BITCOIN_CITY = isProduction
  ? 'https://newbitcoincity.com/'
  : 'https://dev.newbitcoincity.com/';
export const BUY_TC_URL = NEW_BITCOIN_CITY + '/topup';

export const PDF_DOC_URL = DOMAIN_URL + '/bvm.pdf';

export { MetadataConfig, ViewportConfig };
