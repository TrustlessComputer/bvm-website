import TOKEN_ADDRESS from '@/constants/token';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import CContractBase from '../base';
import { LaunchpadPool } from './abis/launchpadPool';
import LaunchPoolAbi from './abis/launchpadPool.json';
import {
  IBodyStartLaunchpad,
  IBodyTransferBVMLaunchpad,
} from './launchpad.interface';

class CLaunchpad extends CContractBase {
  private getLaunchPool = (launchPoolAddress: string) => {
    return new ethers.Contract(
      launchPoolAddress,
      LaunchPoolAbi,
      this.getProviderByChain(),
    ) as LaunchpadPool;
  };

  public transferBVMFee = async (body: IBodyTransferBVMLaunchpad) => {
    try {
      const connector = this.nakaConnectContext.getConnector();
      const calldata = this.getERC20Contract({
        contractAddress: TOKEN_ADDRESS.BVM_TOKEN_ADDRESS,
      }).interface.encodeFunctionData('transfer', [
        body.adminAddress,
        parseEther(body.amountBVM),
      ]);
      const tx = await connector.requestSign({
        calldata,
        target: 'popup' as any,
        to: TOKEN_ADDRESS.BVM_TOKEN_ADDRESS,
        functionType: 'Transfer fee amount BVM launchpad',
        chainType: 'NAKA',
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
}

export default CLaunchpad;
