import { BridgeNetwork, BridgeToken } from '@/modules/Bridges/types';
import { CHAIN_TYPE } from '@constants/chains';
import { decodeAccountID } from 'ripple-address-codec';

interface IEstimate {
  fromToken: BridgeToken;
  toToken: BridgeToken;

  fromNetwork: BridgeNetwork;
  toNetwork: BridgeNetwork;
}

const estimateBridge = (values: IEstimate) => {
  const { fromToken, toToken } = values;
  let minAmount = 0;
  let processingTime = '5 mins';

  const isSolana =
    toToken.network.name === CHAIN_TYPE.SOLANA ||
    fromToken.network.name === CHAIN_TYPE.SOLANA;
  const isArbitrum =
    toToken.network.name === CHAIN_TYPE.ARBITRUM ||
    fromToken.network.name === CHAIN_TYPE.ARBITRUM;

  const isXRP =
    toToken.network.name === CHAIN_TYPE.RIPPLE ||
    fromToken.network.name === CHAIN_TYPE.RIPPLE;

  const isDoge =
    toToken.network.name === CHAIN_TYPE.DOGE ||
    fromToken.network.name === CHAIN_TYPE.DOGE;

  if (isSolana || isArbitrum) {
    minAmount = 5;
    processingTime = '2 minutes';
  } else if (isXRP) {
    minAmount = 0.004;
    processingTime = '2 minutes';
  } else if (isDoge) {
    minAmount = 0.005;
    processingTime = '2 minutes';
  }
  return {
    minAmount,
    processingTime,
  };
};

const isRippleAddress = (address: string) => {
  try {
    decodeAccountID(address);
    return true;
  } catch (error) {
    return false;
  }
};

const isDogeAddress = (address: string) => {
  try {
    return /^D[a-km-zA-HJ-NP-Z1-9]{33,34}$/.test(address);
  } catch (error) {
    return false;
  }
};

export { estimateBridge, isRippleAddress, isDogeAddress };
