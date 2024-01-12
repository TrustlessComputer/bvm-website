import { useContext } from 'react';
import { XVerseContext } from '@/Providers/xverse-context';
import { UnisatContext } from '@/Providers/unisat-context';
import { WalletType } from '@/interfaces/wallet';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';

const MESSAGE_FOR_SIGN = (address: string) => {
  return `Bitcoin Virtual Machine (BVM) is requesting you to sign this message with your Bitcoin wallet ${address}. By clicking "Sign" or "Approve," you are verifying that you are the rightful owner of the wallet. Please note that this action is only for authentication purposes and will not initiate any blockchain transactions, nor will it incur any network or gas fees.`
};

const useConnect = () => {
  const xverseCtx = useContext(XVerseContext);
  const unisatCtx = useContext(UnisatContext);

  const onConnect = async (type: WalletType) => {
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
          await xverseCtx.onConnect();
        }
      }
      break;
      case WalletType.unisat:
        await unisatCtx.onConnect();
        break;
    }
  }

  const signMessage = async (type: WalletType) => {
    try {
      await onConnect(type);
      switch (type) {
        case WalletType.unisat: {
          const unisat = (window as any)?.unisat;
          if (unisat) {
            const accounts = await unisat.getAccounts();
            if (!!accounts.length) {
              const message = MESSAGE_FOR_SIGN(accounts[0]);
              const signature = await unisat.signMessage(
                message,
                'bip322-simple'
              );
              console.log('SANG TEST: ', signature);
            }
          }
        }
      }

    } catch (error) {
      const { message } = getError(error);
      toast.error(message)
    }
  }

  return {
    onConnect,
    signMessage
  }
};

export default useConnect;
