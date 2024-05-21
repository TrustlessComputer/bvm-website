import TOKEN_ADDRESS from '@/constants/token';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import CContractBase from '../base';
import CToken from '../token';
import { LaunchpadPool } from './abis/launchpadPool';
import LaunchPoolAbi from './abis/launchpadPool.json';
import {
  IBodyDepositLaunchpad,
  IBodyStartLaunchpad,
  IBodyTransferBVMLaunchpad,
} from './launchpad.interface';

class CLaunchpad extends CContractBase {
  private Token = new CToken();

  private getLaunchPool = (launchPoolAddress: string) => {
    return new ethers.Contract(
      launchPoolAddress,
      LaunchPoolAbi,
      this.getProviderByChain(),
    ) as LaunchpadPool;
  };

  public transferBVMFee = async (body: IBodyTransferBVMLaunchpad) => {
    try {
      const tx = await this.Token.transfer({
        token_address: TOKEN_ADDRESS.BVM_TOKEN_ADDRESS,
        to_address: body.adminAddress,
        amount: body.amountBVM,
      });
      return tx;
    } catch (error) {
      throw error;
    }
  };

  public startLaunchpad = async (body: IBodyStartLaunchpad) => {
    try {
      const connector = this.nakaConnectContext.getConnector();

      const calldata = this.getLaunchPool(
        body.launchPoolAddress,
      ).interface.encodeFunctionData('start', [body.saleTokenAddress]);

      const tx = await connector.requestSign({
        calldata,
        target: 'popup' as any,
        to: body.launchPoolAddress,
        functionType: 'Start launchpad',
        chainType: 'NAKA',
      });
      return tx;
    } catch (error) {
      throw error;
    }
  };

  public userDeposit = async (body: IBodyDepositLaunchpad) => {
    try {
      const connector = this.nakaConnectContext.getConnector();

      const calldata = this.getLaunchPool(
        body.launchPoolAddress,
      ).interface.encodeFunctionData('deposit', [
        body.depositTokenAddress,
        body.depositAmount,
      ]);

      const tx = await connector.requestSign({
        calldata,
        target: 'popup' as any,
        to: body.launchPoolAddress,
        functionType: 'Deposit launchpad',
        chainType: 'NAKA',
      });
      return tx;
    } catch (error) {
      throw error;
    }
  };
}

export default CLaunchpad;
