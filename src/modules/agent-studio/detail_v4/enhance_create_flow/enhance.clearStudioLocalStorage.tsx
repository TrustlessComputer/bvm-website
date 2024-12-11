import { useEffect, useState } from 'react';
import useRfLocalStorageHelper from '../../Buy/hooks/useRfLocalStorageHelper';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';
import { LOCAL_VERSION } from '@constants/storage-key';

const clearStudioLocalStorage =
  (WrappedComponent: ChainDetailComponent) =>
    (props: ChainDetailComponentProps) => {
      const [isClear, setClear] = useState(false);
      const { clearStoreLocalStorage } = useRfLocalStorageHelper();

      const clear = () => {
        const currentVersion = Number(LOCAL_VERSION);

        for (let i = currentVersion - 1; i > 0; i--) {
          const oldVersion = i;
          const LAST_NODES = `${oldVersion}-last_nodes`,
            USE_DRAG_SIGNALS = `${oldVersion}-use_drag_signals`,
            USE_SIGNALS_FORM = `${oldVersion}-use_signals_form`,
            USE_BLOCKCHAIN_FORM = `${oldVersion}-use_blockchain_form`;

          localStorage.removeItem(LAST_NODES);
          localStorage.removeItem(USE_DRAG_SIGNALS);
          localStorage.removeItem(USE_SIGNALS_FORM);
          localStorage.removeItem(USE_BLOCKCHAIN_FORM);


        }


        // clearStoreLocalStorage();
        setClear(true);
      };

      useEffect(() => {
        clear();
      }, []);

      if (!isClear) return null;
      return <WrappedComponent {...props} />;
    };

export default clearStudioLocalStorage;
