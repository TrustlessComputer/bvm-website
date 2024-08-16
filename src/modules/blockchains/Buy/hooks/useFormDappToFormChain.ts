import React from 'react';
import useDapps from './useDapps';
import { useSignalEffect } from '@preact/signals-react';
import { draggedDappIndexesSignal } from '../signals/useDragSignal';
import { cloneDeep } from '../utils';

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

    const dappIndexes = cloneDeep(draggedDappIndexesSignal.value);
    dappIndexes.forEach((dappIndex) => {
      const dapp = dapps[dappIndex];

      if (dappCount[dapp.key] === undefined) {
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
