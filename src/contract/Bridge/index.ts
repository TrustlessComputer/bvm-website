import { IBridgeTokenParams } from '@/contract/Bridge/type';
import BridgeABI from './abis/BridgeABI.json';
import { Bridge } from './abis/Bridge';
import { ethers } from 'ethers';
import CTokenVer2 from '@/contract/token/CTokenVer2';
import { ChainID } from '@constants/chains';
import { CHAIN_ID } from '@components/WagmiConnector/config';
import { isNativeToken } from '@constants/token';
import BigNumber from 'bignumber.js';

class CBridgeContract extends CTokenVer2 {

  approveToken = async ({
    token_address,
    spender_address,
    chainID = CHAIN_ID.TC_RIPPLE,
  }: {
    token_address: string;
    spender_address: string;
    chainID?: ChainID;
  }) => {
    const erc20Contract = this.getERC20Contract({
      contractAddress: token_address,
      chainID,
    });

    chainID = chainID?.toString() as ChainID;

    const calldata = erc20Contract.interface.encodeFunctionData('approve', [
      spender_address,
      ethers.constants.MaxUint256,
    ]);

    const tx = await this.wagmi.onSendTransaction({
      data: calldata,
      to: token_address,
      chainId: Number(chainID),
      wait: true,
    });

    return tx;
  };

  private getBridgeContract = ({ bridgeAddress }: { bridgeAddress: string }) => {
    const contract = new ethers.Contract(
      bridgeAddress,
      BridgeABI,
    ) as Bridge;

    // this.bridgeContract = contract;
    return contract;
  }

  public onBridgeToken = async (params: IBridgeTokenParams) => {
    const { tokenAddress, bridgeAddress, receiver, humanAmount, destinationChainId, fromChainId, toChainId } = params;

    const isNeedApprove = await this.isNeedApprove({
      token_address: tokenAddress,
      spender_address: bridgeAddress,
      chainID: fromChainId
    });

    if (isNeedApprove) {
      await this.approveToken({
        token_address: tokenAddress,
        spender_address: bridgeAddress,
        chainID: fromChainId,
      });
    }

    // format to ether amount
    const amount = ethers.utils.parseUnits(humanAmount.toString(), 18);
    const contract = this.getBridgeContract({ bridgeAddress });
    let calldata: string = "";
    const isNative = isNativeToken(tokenAddress);

    if (isNative) {
      calldata = contract.interface.encodeFunctionData(
        'bridgeToken(string,uint256)',
        [receiver, toChainId?.toString()],
      );
    } else {
      calldata = contract.interface.encodeFunctionData(
        'bridgeToken(address,uint256,string,uint256)',
        [tokenAddress, amount, receiver, destinationChainId],
      );
    }

    const hash = await this.wagmi.onSendTransaction({
      data: calldata,
      to: bridgeAddress,
      value: isNative ? humanAmount : undefined,
      wait: false,
      chainId: Number(fromChainId?.toString()),
    });

    return hash;
  }
}

export default CBridgeContract;
