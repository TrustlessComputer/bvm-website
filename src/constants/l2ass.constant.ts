
import { isProduction } from '@/config';

const MAIN_PATH = '/trustless-computers-iframe/';
const APP_URL =
  (isProduction
    ? 'https://newbitcoincity.com'
    : 'https://dev.newbitcoincity.com') + MAIN_PATH;

const DASH_BOARD_URL = APP_URL + 'computers/';
const TOKEN_URL = APP_URL + 'token/';
const PRICE_URL = APP_URL + 'price/';
const BUY_URL = APP_URL + 'buy/';

// const META_DATA = {
//   title: 'Trustless Computer',
//   description: 'Launch your own Bitcoin L2 blockchain in one click.',
//   image: `${CDN_URL_IMAGES}/trustless-computer-metadata-01.png`,
// };

const configs = {
  APP_URL,
  DASH_BOARD_URL,
  TOKEN_URL,
  PRICE_URL,
  // META_DATA,
  BUY_URL,
  MAIN_PATH,
};

export default configs;
