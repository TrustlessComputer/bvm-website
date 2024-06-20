/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
import { isProduction } from '@/config';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { BigNumber, Wallet } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import CContract from './contract';
import { useContext } from 'react';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';

export enum ETypes {
  staking = 'staking',
}

export const typeToFee = {
  [ETypes.staking]: 50000,
};

class CContractBase extends CContract {
  private nakaWallet = useNakaAuthen();
  public nakaConnectContext = useContext(NakaConnectContext);

  private wallet: Wallet | undefined = undefined;

  getWallet = async () => {
    if (this.wallet === undefined) {
      this.wallet = {
        address: this.nakaWallet.nakaAddress,
      } as Wallet;
    }
    return this.wallet;
  };

  public getGasPrice = async () => {
    return BigNumber.from(isProduction ? '100000' : parseUnits('2', 9));
  };
}

export default CContractBase;
