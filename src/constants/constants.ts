import sanitizeHtml from 'sanitize-html';

const MIN_DECIMAL = 2;
const MAX_DECIMAL = 6;
const NATIVE_ETH_ADDRESS = '0x0000000000000000000000000000000000000000';
const METAMASK_DOWNLOAD_PAGE = 'https://metamask.io/download/';
const MULTIPLE_POINT_SYMBOL = 'SHARD';
const BVM_TOKEN_SYMBOL = '$BVM';

export {
  BVM_TOKEN_SYMBOL, MAX_DECIMAL, METAMASK_DOWNLOAD_PAGE, MIN_DECIMAL, MULTIPLE_POINT_SYMBOL, NATIVE_ETH_ADDRESS
};
  

export const ALLOWED_ATTRIBUTES = {
  '*': ['style'],
  span: ['class'],
  a: ['href', 'target'],
  img: ['src', 'width', 'height'],
  iframe: ['src', 'width', 'height'],
};

export const TEXT_DIRTY_CONFIG = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: ALLOWED_ATTRIBUTES,
  allowedSchemes: ['data', 'http', 'https'],
};
