'use client';

import configs from '@/constants/l2ass.constant';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export enum IframeEventName {
  topup = 'topup',
  create_gamefi_wallet = 'create_gamefi_wallet',
  import_gamefi_wallet = 'import_gamefi_wallet',
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true);
    }
  }, []);

  useEffect(() => {
    if (hydration && window) {
      window.onmessage = function (event: IFrameEvent & any) {
        try {
          const eventData = JSON.parse(event.data);
          console.log;
          switch (eventData.name) {
            case IframeEventName.trustless_computer_change_route: {
              const subUrl = (eventData.url || '').split('/');
              if (subUrl.length > 0) {
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
