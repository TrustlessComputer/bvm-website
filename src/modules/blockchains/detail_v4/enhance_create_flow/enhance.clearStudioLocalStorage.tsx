import { useEffect, useState } from 'react';
import useRfLocalStorageHelper from '../../Buy/hooks/useRfLocalStorageHelper';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

const clearStudioLocalStorage =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const [isClear, setClear] = useState(false);
    const { clearStoreLocalStorage } = useRfLocalStorageHelper();

    const clear = () => {
      clearStoreLocalStorage();
      setClear(true);
    };

    useEffect(() => {
      clear();
    }, []);

    if (!isClear) return null;
    return <WrappedComponent {...props} />;
  };

export default clearStudioLocalStorage;
