import { useSignalEffect } from '@preact/signals-react';
import React from 'react';
import { draggedDappIndexesSignal } from '../signals/useDragSignal';
import { cloneDeep } from '../utils';
import useDapps from './useDapps';

const useFormDappToFormChain = () => {
  const { dapps } = useDapps();

  const [dappCount, setDappCount] = React.useState<Record<string, number>>({});
  const [dappIndexes, setDappIndexes] = React.useState<
    typeof draggedDappIndexesSignal.value
  >([]);

  useSignalEffect(() => {
    setDappIndexes(draggedDappIndexesSignal.value);
  });

  React.useEffect(() => {
    const dappCount: Record<string, number> = {};

    console.log('[useFormDappToFormChain]', {
      dappIndexes: draggedDappIndexesSignal.value,
    });

    const dappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    dappIndexes.forEach((dappIndex) => {
      const dapp = dapps[dappIndex];

      if (!dapp) return;

      if (typeof dappCount[dapp.key] === 'undefined') {
        dappCount[dapp.key] = 1;
      } else {
        dappCount[dapp.key]++;
      }
    });

    setDappCount(dappCount);
  }, [dappIndexes]);

  return {
    dappCount,
  };
};

export default useFormDappToFormChain;
