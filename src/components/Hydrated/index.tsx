'use client';

import configs from '@/constants/l2ass.constant';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWeb3Authenticated } from '@/Providers/AuthenticatedProvider/hooks';
import toast from 'react-hot-toast';

export enum IframeEventName {
  topup = 'topup',
  create_wallet = 'create_wallet',
  import_wallet = 'import_wallet',
  hide_sidebar = 'hide_sidebar',
  open_sidebar = 'open_sidebar',
  trustless_computer_change_route = 'trustless-computer-change-route',
}
export interface IFrameEvent {
  data: {
    name: IframeEventName;
  };
}

const Hydrated = ({ children }: { children?: any }) => {
  const [hydration, setHydration] = useState(false);
  const router = useRouter();
  const { login } = useWeb3Authenticated();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true);
    }
  }, []);

  const loginWeb3AuthHandler = async () => {
    try {
      // await onLoginMetamask();
      console.log('loginWeb3AuthHandler 1 ', login);
      await login();
    } catch (err: unknown) {
      console.log('loginWeb3AuthHandler 2 ERROR ', err);
      toast.error(
        (err as Error).message ||
          'Something went wrong. Please try again later.',
      );
    }
  };
  useEffect(() => {
    if (hydration && window) {
      window.onmessage = function (event: IFrameEvent & any) {
        try {
          const eventData = JSON.parse(event.data);
          console.log('PostMessage --- eventData  ', eventData);

          switch (eventData.name) {
            case IframeEventName.trustless_computer_change_route: {
              const subUrl = (eventData.url || '').split('/');
              const message = eventData.message;
              console.log('PostMessage --- message  ', message);
              if (message === 'REQUIRED_LOGIN') {
                // TO DO
                console.log('PostMessage --- REQUIRED_LOGIN GO GO  ');
                loginWeb3AuthHandler();
              } else if (subUrl.length > 0) {
                let lastSubUrl: string = subUrl[subUrl.length - 1];

                // lastSubUrl = lastSubUrl.replaceAll('buy', 'customize');
                // if (lastSubUrl.includes('trustless-computers-iframe')) {
                //   window.history.replaceState({}, '', '/blockchains');
                // } else {
                //   window.history.replaceState(
                //     {},
                //     '',
                //     '/blockchains/' + lastSubUrl,
                //   );
                // }

                if (lastSubUrl === 'buy') {
                  router.replace('/blockchains/customize');
                } else {
                }
              }
              break;
            }
            default:
              break;
          }
        } catch (error) {}
      };
    }
  }, [hydration]);

  return hydration ? children : null;
};

export default Hydrated;
