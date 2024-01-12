"use client"
import React, { PropsWithChildren } from 'react';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import {
  signMessage,
  getAddress,
  SignMessageOptions,
  GetAddressOptions,
  BitcoinNetworkType,
  Capability,
  getCapabilities
} from 'sats-connect';
import { IConnectedInfo } from '@/interfaces/wallet';

export interface IXVerseContext {
  onConnect: () => Promise<unknown>;
  capabilityMessage?: string | undefined;
  capabilityState: TypeCapabilityState;
  openInstall: () => void;
}

type TypeCapabilityState = 'loading' | 'loaded' | 'missing' | 'cancelled';

const initialValue: IXVerseContext = {
  onConnect: () => new Promise(() => undefined),
  capabilityMessage: undefined,
  capabilityState: 'loading',
  openInstall: () => undefined,
};

export const XVerseContext = React.createContext<IXVerseContext>(initialValue);

export const XVerseProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {

  const network = BitcoinNetworkType?.Mainnet || 'Mainnet';

  const [capabilityState, setCapabilityState] =
    React.useState<TypeCapabilityState>('loading');
  const [capabilities, setCapabilities] = React.useState<Set<Capability>>();

  const capabilityMessage = React.useMemo(() => {
    return capabilityState === 'loading'
      ? 'Checking capabilities...'
      : capabilityState === 'cancelled'
      ? 'Capability check cancelled by wallet. Please refresh the page and try again.'
      : capabilityState === 'missing'
      ? 'Could not find an installed Sats Connect capable wallet. Please install a wallet and try again.'
      : !capabilities
      ? 'Something went wrong with getting capabilities'
      : undefined;
  }, [capabilityState, capabilities]);

  const openInstall = () => {
    window.open('https://www.xverse.app/download');
  };

  const connect = async () => {
    return new Promise<IConnectedInfo>((resolve, reject) => {
      getAddress({
        payload: {
          purposes: ['ordinals', 'payment'],
          message: 'Address for receiving Ordinals and payments',
          network: {
            type: 'Mainnet',
          },
        },
        onFinish: response => {
          const addresses = response.addresses;
          if (!addresses || addresses.length < 2) {
            return reject('Connect to xverse failed.');
          }

          const address = addresses[0].address;


          resolve({
            address: address,
            publicKey: addresses[0].publicKey,
          });
        },
        onCancel: () => reject('User rejected the request.'),
      } as GetAddressOptions);
    });
  };

  const onConnect = async () => {
    try {
    } catch (error) {
      const { message } = getError(error);
      toast.error(message);
    }
  };

  React.useEffect(() => {
    const runCapabilityCheck = async () => {
      let runs = 0;
      const MAX_RUNS = 20;
      setCapabilityState('loading');

      // the wallet's in-page script may not be loaded yet, so we'll try a few times
      while (runs < MAX_RUNS) {
        try {
          await getCapabilities({
            onFinish(response: any) {
              setCapabilities(new Set(response));
              setCapabilityState('loaded');
            },
            onCancel() {
              setCapabilityState('cancelled');
            },
            payload: {
              network: {
                type: network,
              },
            },
          } as any);
        } catch (e) {
          runs++;
          if (runs === MAX_RUNS) {
            setCapabilityState('missing');
          }
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    runCapabilityCheck().then();
  }, [network]);
  const contextValues = React.useMemo((): IXVerseContext => {
    return {
      onConnect,
      capabilityMessage,
      capabilityState,
      openInstall,
    };
  }, [onConnect, capabilityMessage]);

  return (
    <XVerseContext.Provider value={contextValues}>
      {children}
    </XVerseContext.Provider>
  );
};
