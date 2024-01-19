const MIN_DECIMAL = 2;
const MAX_DECIMAL = 6;
const NATIVE_ETH_ADDRESS = '0x0000000000000000000000000000000000000000';
const METAMASK_DOWNLOAD_PAGE = 'https://metamask.io/download/';

export { MIN_DECIMAL, MAX_DECIMAL, NATIVE_ETH_ADDRESS, METAMASK_DOWNLOAD_PAGE };

export const ALLOWED_ATTRIBUTES = {
  '*': ['style'],
  span: ['class'],
  a: ['href', 'target'],
  img: ['src', 'width', 'height'],
  iframe: ['src', 'width', 'height'],
};
