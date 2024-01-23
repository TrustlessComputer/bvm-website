import { WalletError, WalletErrorCode } from '@/enums/wallet-error';
import { MetaMaskInpageProvider } from '@metamask/providers';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { WalletOperationReturn } from '@/interfaces/wallet';
import { isMobile } from 'react-device-detect';
import { METAMASK_DOWNLOAD_PAGE, NATIVE_ETH_ADDRESS } from '@/constants/constants';

export const openMetamaskDeeplink = (url?: string): void => {
  const appURL =
    url ||
    window.location.hostname.replace(/^https?:\/\//, '').replace('/', '');
  const deeplink = `https://metamask.app.link/dapp/${appURL}`;
  window.location.href = deeplink;
};

export const sendMetamaskDeeplink = (
  toAddress: string,
  amount: string,
  chainId: number,
  tokenInfor?: {
    tokenAddress: string;
    decimal: number;
    symbol?: string;
  },
) => {
  if (!tokenInfor) {
    throw Error('Token informatino is invalid');
  }

  let value;
  let tokenSymbol;
  let deeplink;
  if (tokenInfor?.tokenAddress === NATIVE_ETH_ADDRESS) {
    const weiValue = ethers.utils.parseUnits(amount, 'ether');
    const hexValue = ethers.utils.hexlify(weiValue);
    value = hexValue;
    tokenSymbol = 'eth';
    deeplink = `https://metamask.app.link/send/${toAddress}@${chainId}?value=${value}&asset=${tokenSymbol}`;
  } else {
    value = ethers.utils.hexlify(
      new BigNumber(amount).multipliedBy(`1e${tokenInfor.decimal}`).toNumber(),
    );
    tokenSymbol = tokenInfor.symbol || 'eth';
    deeplink = `https://metamask.app.link/send?asset=${tokenSymbol?.toLowerCase()}&to=${toAddress}&value=${12}`;
  }
  window.location.href = deeplink;
};

const isMetamaskInstalled = () => {
  const metamaskProvider = getMetamaskProvider();
  return !!metamaskProvider?.isMetaMask;
};

const isDeepLinkRequired = (): boolean => {
  return isMobile && !isMetamaskInstalled();
};

const getMetamaskProvider = (): MetaMaskInpageProvider | undefined => {
  return (window as any)?.ethereum as MetaMaskInpageProvider | undefined;
};

const isChainSupported = async (chainID: number): Promise<boolean> => {
  try {
    const currentChainID = await getMetamaskProvider()?.chainId;
    return chainID === Number(currentChainID);
  } catch (err: unknown) {
    return false;
  }
};

const connect = async (): Promise<WalletOperationReturn<string | null>> => {
  try {
    const addresses = await getMetamaskProvider()?.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    if (addresses && Array.isArray(addresses)) {
      return {
        isError: false,
        isSuccess: true,
        message: '',
        data: addresses[0],
      };
    }
    return {
      isError: true,
      isSuccess: false,
      message: WalletError.FAILED_CONNECT,
      data: null,
    };
  } catch (err: unknown) {
    return {
      isError: true,
      isSuccess: false,
      message: WalletError.FAILED_CONNECT,
      data: null,
    };
  }
};

export const signMessage = async (message: any): Promise<{ message: string, address: string, signature: string }> => {
  try {
    if (!(window as any).ethereum) {
      throw Error(WalletError.NO_INSTANCE);
    }

    if (!isMetamaskInstalled()) {
      window.open(METAMASK_DOWNLOAD_PAGE);
      throw Error(WalletError.NO_METAMASK);
    }

    const web3Provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const addresses = await web3Provider.send('eth_requestAccounts', []);
    const signer = web3Provider.getSigner();

    const address = addresses && Array.isArray(addresses) ? addresses[0] : '';
    const signature = await signer.signMessage(
      typeof message === 'function' ? message(address) : message,
    );
    return {
      address,
      signature,
      message,
    };
  } catch (err) {
    throw err;
  }
};

