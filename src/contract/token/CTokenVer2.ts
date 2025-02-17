import { isNativeToken } from '@constants/token';
import { useContext } from 'react';
import { WagmiProviderContext } from '@components/WagmiConnector/WagmiProvider';
import { BigNumber, ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { ERC20 } from '../interfaces/ERC20';
import { ContractParamsVer2 } from '@/contract/interfaces';
import ERC20ABI from '@/contract/abis/ERC20.json';
import CBaseVer2 from '@/contract/CBaseVer2';
import { CHAIN_ID } from '@components/WagmiConnector/config';
import { ChainID } from '@constants/chains';

class CTokenVer2 extends CBaseVer2 {
  public wagmi = useContext(WagmiProviderContext);
  private erc20: ERC20 | undefined = undefined;

  public getERC20Contract = (params: ContractParamsVer2) => {
    const { contractAddress } = params;
    this.erc20 = new ethers.Contract(
      contractAddress,
      ERC20ABI,
      this.getProviderByChainID(params.chainID),
    ) as ERC20;
    return this.erc20;
  };

  isNeedApprove = async ({
   token_address,
   spender_address,
   chainID = CHAIN_ID.TC_RIPPLE,
  }: {
    token_address: string;
    spender_address: string;
    chainID?: number | string;
  }) => {
    try {
      if (isNativeToken(token_address)) return false;

      const _wallet = this.wagmi?.latestAddress as string;
      const response = await this.getERC20Contract({
        contractAddress: token_address,
        chainID,
      }).allowance(_wallet, spender_address);

      return BigNumber.from(response).lt(parseEther('1'));
    } catch (error) {
      return true;
    }
  };

  public getTokenBalance = async (
    tokenAddress: string,
    chainId: ChainID,
    walletAddress?: string,
  ) => {
    try {
      const latestAddress: string =
        walletAddress || (this.wagmi?.latestAddress as string);

      if (isNativeToken(tokenAddress)) {
        const balance = await this.getProviderByChainID(chainId)?.getBalance(
          latestAddress,
        );

        return formatEther(balance).toString();
      }

      const balance = await this.getERC20Contract({
        contractAddress: tokenAddress,
        chainID: chainId?.toString(),
      }).balanceOf(latestAddress as string);

      console.log('getTokenBalance balance', balance);

      return formatEther(balance).toString();
    } catch (e) {
      console.log('error getTokenBalance', e);

      return '0';
    }
  };
}

export default CTokenVer2;
