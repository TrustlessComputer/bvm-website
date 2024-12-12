import { useSignalEffect } from '@preact/signals-react';
import React from 'react';
import { draggedDappIndexesSignal } from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';

const useFormDappToFormChain = () => {
  const dapps = useDappsStore((state) => state.dapps);

  const [dappIndexes, setDappIndexes] = React.useState<
    typeof draggedDappIndexesSignal.value
  >([]);

  useSignalEffect(() => {
    setDappIndexes(draggedDappIndexesSignal.value);
  });

  // console.log('[useFormDappToFormChain]', {
  //   dappIndexes,
  // });

  const dappCount = React.useMemo(() => {
    const dappCount: Record<string, number> = {};

    dappIndexes.forEach((dappIndex) => {
      const dapp = dapps[dappIndex];

      if (!dapp) return;

      if (typeof dappCount[dapp.key] === 'undefined') {
        dappCount[dapp.key] = 1;
      } else {
        dappCount[dapp.key]++;
      }
    });

    // console.log('[useFormDappToFormChain] b', {
    //   dappCount,
    // });

    return dappCount;
  }, [dappIndexes]);

  return {
    dappCount,
  };
};

export default useFormDappToFormChain;
