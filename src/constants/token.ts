import { isProduction } from '@/config';
import { compareString } from '@utils/string';

const NATIVE_ETH_ADDRESS = '0x0000000000000000000000000000000000000000';
const NATIVE_TOKEN_ADDRESS = NATIVE_ETH_ADDRESS;

const WRAP_NATIVE_TOKEN_ADDRESS = isProduction
  ? '0xDe4c4768ee70D97C044062fEC971eAE91B6aFAB7'
  : '0x86419Faa35b296eF5e7ce2AAc949E0Be63a4bD42';

const NATIVE_TOKEN_LIST = [
  NATIVE_ETH_ADDRESS, // ETH on Ethereum
  NATIVE_TOKEN_ADDRESS,
  WRAP_NATIVE_TOKEN_ADDRESS,
];

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

const TOKEN_ADDRESS = {
  NATIVE_ETH_ADDRESS,
  NATIVE_TOKEN_ADDRESS,
  WRAP_NATIVE_TOKEN_ADDRESS,
  ADDRESS_ZERO,
  NATIVE_TOKEN_LIST
}

export default TOKEN_ADDRESS;

export const isNativeToken = (tokenAddress: string) => {
  return NATIVE_TOKEN_LIST.some((address) =>
    compareString(address, tokenAddress),
  );
};
