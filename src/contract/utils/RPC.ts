import { ERC20Chain } from '@/contract/interfaces';
import { NAKA_RPC_URL } from '@/config';
import { ethers } from 'ethers';
import { isProduction } from '@/utils/commons';
import BigNumberJS from 'bignumber.js';

const getRPCByChain = (chain?: ERC20Chain) => {
  const _chain = chain || 'NAKA';
  switch (_chain) {
    case 'NAKA':
      return NAKA_RPC_URL;
    default:
      return NAKA_RPC_URL;
  }
};

export const getProvider = (chain?: ERC20Chain) => {
  const _chain = chain || 'NAKA';

  const rpc = getRPCByChain(_chain);
  return new ethers.providers.JsonRpcProvider(rpc);
};

export const getGasPrice = async (chain?: ERC20Chain) => {
  const _chain = chain || 'NAKA';
  const provider = getProvider(_chain);
  const gasPrice = await provider.getGasPrice();
  const HARD_GAS = '100000';
  if (
    isProduction() &&
    new BigNumberJS(gasPrice.toString()).gt(new BigNumberJS(HARD_GAS).times(5))
  ) {
    return HARD_GAS;
  }
  return gasPrice.toString();
};

export const getTransactionCount = async (params: {
  chain?: ERC20Chain;
  address: string;
}) => {
  const _chain = params.chain || 'NAKA';
  const provider = getProvider(_chain);
  return provider.getTransactionCount(params.address);
};

export const getDataPrepareTx = async (params: { address: string }) => {
  const [nonce, gasPrice] = await Promise.all([
    await getTransactionCount({ address: params.address }),
    await getGasPrice(),
  ]);

  return {
    nonce,
    gasPrice,
  };
};

export default getRPCByChain;
