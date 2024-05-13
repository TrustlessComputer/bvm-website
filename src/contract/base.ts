/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import CContract from './contract';
import { Wallet } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export enum ETypes {
  staking = 'staking',
}

export const typeToFee = {
  [ETypes.staking]: 50000,
};

class CContractBase extends CContract {
  private nakaWallet = useNakaAuthen();

  private wallet: Wallet | undefined = undefined;

  getWallet = async () => {
    if (this.wallet === undefined) {
      this.wallet = {
        address: this.nakaWallet.nakaAddress,
      } as Wallet;
    }
    return this.wallet;
  };

  public getTokenInfo = async (token_address: string) => {
    try {
      const _wallet = await this.getWallet();
      const tokenERC20 = this.getERC20Contract({
        contractAddress: token_address,
      });
      const [name, supply, symbol, decimals] = await Promise.all([
        tokenERC20.name(),
        tokenERC20.totalSupply(),
        tokenERC20.symbol(),
        tokenERC20.decimals(),
      ]);
      let balance: any = 0;
      if (_wallet?.address) {
        balance = await this.getERC20Contract({
          contractAddress: token_address,
        }).balanceOf(_wallet.address);

        balance = formatUnits(balance, decimals);
      }
      return {
        name,
        supply: formatUnits(supply, decimals),
        symbol,
        decimals,
        balance,
      };
    } catch (error) {
      throw error;
    }
  };
}

export default CContractBase;
