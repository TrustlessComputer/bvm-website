import { useContext } from 'react';
import { XVerseContext } from '@/Providers/xverse-context';
import { UnisatContext } from '@/Providers/unisat-context';
import { IConnectedInfo, WalletType } from '@/interfaces/wallet';
import { getError } from '@/utils/error';
import { verifyBTCSignature } from '@/services/whitelist';
import { AddressType, getAddressInfo } from 'bitcoin-address-validation';
import messageVerifier from '@/utils/message.verifier';
import AllowListStorage from '@/utils/storage/allowlist.storage';
import toast from 'react-hot-toast';

const MESSAGE_FOR_SIGN = (address: string) => {
  return `Bitcoin Virtual Machine (BVM) is requesting you to sign this message with your Bitcoin wallet ${address}. By clicking "Sign" or "Approve," you are verifying that you are the rightful owner of the wallet. Please note that this action is only for authentication purposes and will not initiate any blockchain transactions, nor will it incur any network or gas fees.`
};

const getAddressType = (address: string): AddressType => {
  return getAddressInfo(address).type
}

const isSupportBip322 = (addressType: AddressType) => (['p2wpkh', 'p2tr'] as AddressType[]).includes(addressType);

const useConnect = () => {
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
      // await verifyBTCSignature({
      //   address,
      //   pubKey,
      //   message,
      //   signature
      // });
      toast.success("Successfully.")
      await AllowListStorage.setStorage({
        address: params.address,
        pubKey: params.pubKey,
        walletType: WalletType.unisat
      })
    }
  }


  const signMessageXverse = async (accounts: IConnectedInfo) => {
    let errors: unknown[] = []
    for (let index = 0; index < accounts.address.length; index++) {
      const address = accounts.address[index];
      const pubKey = accounts.publicKey[index];
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

      try {
        await verifyBTCSignature({
          ...params
        });
        AllowListStorage.setStorage({
          address: params.address,
          pubKey: params.pubKey,
          walletType: WalletType.xverse
        })
      } catch (error) {
        errors.push(error)
      }
    }

    if (errors.length >= 2) {
      const { message } = getError(errors[0]);
      throw new Error(message)
    }
    toast.success("Successfully.")
  }

  const signMessage = async (type: WalletType) => {
    const accounts = await onConnect(type);
    switch (type) {
      case WalletType.unisat: {
        await signMessageUnisat();
        break;
      }
      case WalletType.xverse: {
        if (accounts) {
          await signMessageXverse(accounts)
        }
      }
    }
  }

  return {
    onConnect,
    signMessage
  }
};

export default useConnect;
