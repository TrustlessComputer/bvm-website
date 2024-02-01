import { useContext } from 'react';
import { XVerseContext } from '@/Providers/xverse-context';
import { UnisatContext } from '@/Providers/unisat-context';
import { IConnectedInfo, WalletType } from '@/interfaces/wallet';
import { AddressType, getAddressInfo } from 'bitcoin-address-validation';
import messageVerifier from '@/utils/message.verifier';

const MESSAGE_FOR_SIGN = (address: string) => {
  return `Bitcoin Virtual Machine (BVM) is requesting you to sign this message with your Bitcoin wallet ${address}. By clicking "Sign" or "Approve," you are verifying that you are the rightful owner of the wallet. Please note that this action is only for authentication purposes and will not initiate any blockchain transactions, nor will it incur any network or gas fees.`
};

const isSupportBip322 = (addressType: AddressType) => (['p2wpkh', 'p2tr'] as AddressType[]).includes(addressType);

const useLoginBTC = () => {
  const xverseCtx = useContext(XVerseContext);
  const unisatCtx = useContext(UnisatContext);

  const onConnect = async (type: WalletType): Promise<IConnectedInfo | undefined> => {
    switch (type) {
      case WalletType.xverse: {
        if (
          xverseCtx.capabilityMessage &&
          xverseCtx.capabilityState === 'missing'
        ) {
          xverseCtx.openInstall();
        } else if (xverseCtx.capabilityMessage) {
          throw new Error(xverseCtx.capabilityMessage);
        } else {
          const accounts = await xverseCtx.onConnect();
          return accounts as IConnectedInfo | undefined;
        }
      }
        break;
      case WalletType.unisat:
        await unisatCtx.onConnect();
        break;
    }
  }

  const signMessageUnisat = async () => {
    const unisat = (window as any)?.unisat;
    if (!unisat) throw new Error('Please install unisat.')
    const accounts = await unisat.getAccounts();
    const pubKey = await unisat.getPublicKey();
    if (!!accounts.length) {
      const address = accounts[0];
      const message = MESSAGE_FOR_SIGN(address);
      const signature = await unisat.signMessage(
        message,
      );

      const params = {
        address,
        pubKey,
        message,
        signature,
      };
      console.log('signMessageUnisat: ', params, await messageVerifier(params));

      return params;
    }
  }


  const signMessageXverse = async (accounts: IConnectedInfo) => {
    const address = accounts.address[0];
    const pubKey = accounts.publicKey[0];
    const message = MESSAGE_FOR_SIGN(address);
    const signature = await xverseCtx.onSignMessage({
      address,
      message
    });

    const params = {
      address,
      pubKey,
      message,
      signature,
    };
    console.log('signMessageXverse: ', params, await messageVerifier(params));
    return params;
  }

  const signMessage = async (type: WalletType) => {
    const accounts = await onConnect(type);
    switch (type) {
      case WalletType.unisat: {
        return await signMessageUnisat();
      }
      case WalletType.xverse: {
        if (accounts) {
          return await signMessageXverse(accounts)
        }
      }
    }
  }

  return {
    onConnect,
    signMessage
  }
};

export default useLoginBTC;
