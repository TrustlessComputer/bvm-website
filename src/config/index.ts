import { default as MetadataConfig } from './metadata';
import { default as ViewportConfig } from './viewport';
import process from 'process';

export const APP_ENV: string = process.env.NEXT_PUBLIC_APP_ENV!;
export const API_UR: string = process.env.NEXT_PUBLIC_API_URL!;
export const DOMAIN_URL: string = process.env.NEXT_PUBLIC_DOMAIN_URL!;

export const DEX_API = process.env.NEXT_PUBLIC_DEX_API!;
export const CDN_URL: string = process.env.NEXT_PUBLIC_CDN_URL!;

export const PERP_API_URL = process.env.NEXT_PUBLIC_PERP_API!;
export const PERP_NAKA_API_URL = process.env.NEXT_PUBLIC_NAKA_PERP_API!;
export const BVM_API = process.env.NEXT_PUBLIC_BVM_API!;

export const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!;

export const API_DGAMES = process.env.NEXT_PUBLIC_API_DGAMES!;

export const isProduction: boolean = APP_ENV === 'production';
export const isDevelop: boolean = APP_ENV === 'develop';
export const isLocal: boolean = APP_ENV === 'local';

export const CDN_URL_ICONS: string = CDN_URL + '/nbc/icons/bvm-icons';
export const CDN_APP_ICON_URL: string = CDN_URL + '/l2aas/icons';
export const CDN_URL_IMAGES: string = CDN_URL + '/l2aas/images';
export const CDN_URL_VIDEOS: string = CDN_URL + '/l2aas/videos';

export const NEW_BITCOIN_CITY = isProduction
  ? 'https://newbitcoincity.com/'
  : 'https://dev.newbitcoincity.com/';
export const BUY_TC_URL = NEW_BITCOIN_CITY + 'topup';

// export const PDF_DOC_URL = DOMAIN_URL + '/bvm.pdf';

export const DEVELOPERS_DOC_URL = 'https://docs.bvm.network/';
export const DEVELOPERS_GRANTS_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSejQvjHQE91B4DL4p9pzt4IPhWi05nxdwSI9wktra1i15ieqQ/viewform';
export const WHITEPAPER_DOC_URL = 'https://bvm.network/bvm.pdf/';

// Web3Auth
export const WEB3_AUTH_CLIENT_ID: string = process.env
  .NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID! as string;

// API
export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL! as string;

export const NAKA_RPC_URL: string = process.env.NEXT_PUBLIC_NAKA_RPC!;

export const TC_EXPLORER: string = process.env.NEXT_PUBLIC_TC_EXPLORER!;
export const TC_LAYER2_EXPLORER: string =
  process.env.NEXT_PUBLIC_TC_LAYER2_EXPLORER!;
export const RUNE_EXPLORER: string = process.env.NEXT_PUBLIC_RUNE_EXPLORER!;
export const EAI_EXPLORER: string = process.env.NEXT_PUBLIC_EAI_EXPLORER!;

export const NAKA_WEB: string = process.env.NEXT_PUBLIC_NAKA_WEB!;

export { MetadataConfig, ViewportConfig };
