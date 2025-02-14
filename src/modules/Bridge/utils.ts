import { BridgeNetwork, BridgeToken } from '@/modules/Bridge/types';
import { CHAIN_TYPE } from '@constants/chains';

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

  const isSolana = toToken.network.name === CHAIN_TYPE.SOLANA
    || fromToken.network.name === CHAIN_TYPE.SOLANA;
  const isArbitrum = toToken.network.name === CHAIN_TYPE.ARBITRUM
    || fromToken.network.name === CHAIN_TYPE.ARBITRUM;

  if (isSolana || isArbitrum) {
    minAmount = 5;
    processingTime = '6 hours';
  } else {
    minAmount = 0.5;
    processingTime = '6 hours';
  }

  return {
    minAmount,
    processingTime,
  }
}

export {
  estimateBridge
}
