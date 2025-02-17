import { compareString } from '@utils/string';
import { ethers } from 'ethers';
import { configWagmiChains } from '@components/WagmiConnector/config';
import { ChainID } from '@constants/chains';

class CBaseVer2 {
  public getRPCByChainID = (chainID: ChainID) => {
    const rpcs = configWagmiChains.find((chain) =>
      compareString(chain.id?.toString(), chainID),
    )?.rpcUrls.default.http || [];
    let rpc = '';
    if (rpcs.length > 1) {
      const randomIndex = Math.floor(Math.random() * rpcs.length);
      rpc = rpcs[randomIndex];
    } else {
      rpc = rpcs[0] || '';
    }

    return rpc;
  };

  public getProviderByChainID = (chainID: ChainID) => {
    const rpc = this.getRPCByChainID(chainID?.toString());
    return new ethers.providers.JsonRpcProvider(
      rpc,
    ) as ethers.providers.JsonRpcProvider;
  };

}

export default CBaseVer2;
