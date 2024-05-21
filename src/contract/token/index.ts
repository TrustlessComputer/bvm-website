import { isNativeToken } from '@/constants/token';
import { BigNumber, ethers } from 'ethers';
import { formatEther, formatUnits, parseEther } from 'ethers/lib/utils';
import CContractBase from '../base';

class CToken extends CContractBase {
  isNeedApprove = async ({
    token_address,
    spender_address,
  }: {
    token_address: string;
    spender_address: string;
  }) => {
    try {
      if (isNativeToken(token_address)) return false;

      const _wallet = await this.getWallet();
      const response = await this.getERC20Contract({
        contractAddress: token_address,
        chain: 'NAKA',
      }).allowance(_wallet?.address, spender_address);

      return BigNumber.from(response).lt(parseEther('1'));
    } catch (error) {
      console.log('error', error);
      return true;
    }
  };

  approveToken = async ({
    token_address,
    spender_address,
  }: {
    token_address: string;
    spender_address: string;
  }) => {
    const _wallet = await this.getWallet();

    const erc20Contract = this.getERC20Contract({
      contractAddress: token_address,
    });
    const calldata = erc20Contract.interface.encodeFunctionData('approve', [
      spender_address,
      ethers.constants.MaxUint256,
    ]);

    let tx = undefined;

    if (_wallet.privateKey) {
      tx = await _wallet.sendTransaction({
        data: calldata,
        to: token_address,
        gasPrice: await this.getGasPrice(),
      });

      await tx.wait();
    } else {
      const connector = this.nakaConnectContext.getConnector();
      const calldata = erc20Contract.interface.encodeFunctionData('approve', [
        spender_address,
        ethers.constants.MaxUint256,
      ]);

      tx = await connector.requestSign({
        calldata,
        target: 'popup' as any,
        to: token_address,
        functionType: 'Approve Token',
        chainType: 'RUNE',
      });
    }

    return tx;
  };

  public getTokenBalance = async (tokenAddress: string) => {
    try {
      const _wallet = await this.getWallet();

      if (isNativeToken(tokenAddress)) {
        const balance = await this.getProviderByChain()?.getBalance(
          _wallet.address,
        );
        return formatEther(balance).toString();
      }

      const balance = await this.getERC20Contract({
        contractAddress: tokenAddress,
      }).balanceOf(_wallet?.address as string);

      return formatEther(balance).toString();
    } catch (e) {
      return '0';
    }
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
        token_address,
      };
    } catch (error) {
      throw error;
    }
  };

  public transfer = async ({
    token_address,
    to_address,
    amount,
  }: {
    token_address: string;
    to_address: string;
    amount: string;
  }) => {
    try {
      const connector = this.nakaConnectContext.getConnector();
      const calldata = this.getERC20Contract({
        contractAddress: token_address,
      }).interface.encodeFunctionData('transfer', [
        to_address,
        parseEther(amount),
      ]);
      const tx = await connector.requestSign({
        calldata,
        target: 'popup' as any,
        to: token_address,
        functionType: `Transfer to ${to_address}`,
        chainType: 'NAKA',
      });
      return tx;
    } catch (error) {
      throw error;
    }
  };
}

export default CToken;
