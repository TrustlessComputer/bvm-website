'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useWeb3Authenticated } from '@/Providers/AuthenticatedProvider/hooks';
import toast from 'react-hot-toast';
import { useWeb3Auth } from '@/Providers/AuthenticatedProvider_vs2/Web3Auth.hook';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

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

  const { setShowLoginModalCustomize } = useWeb3Auth();

  // const { login } = useWeb3Authenticated();
  const { showContactUsModal } = useContactUs();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true);
    }
  }, [setShowLoginModalCustomize, window]);

  const loginWeb3AuthHandler = async () => {
    try {
      // await onLoginMetamask();
      console.log('loginWeb3AuthHandler -- ', setShowLoginModalCustomize);
      // await login();
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } catch (err: unknown) {
      console.log('loginWeb3AuthHandler -- ERROR ', err);
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
              if (message === 'REQUEST_CONTACT_US') {
                showContactUsModal();
              } else if (message === 'REQUIRED_LOGIN') {
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
  }, [hydration, setShowLoginModalCustomize, window]);

  return hydration ? children : null;
};

export default Hydrated;
