import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import useDappsStore from '../stores/useDappStore';
import { useNodes } from '../stores/useFlowStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import useNodeHelper from './useNodeHelper';

const useSetDefaultDapp = () => {
  const searchParams = useSearchParams();

  const { addDappToNode } = useNodeHelper();

  const categories = useModelCategoriesStore((state) => state.categories);
  const nodes = useNodes();
  const dapps = useDappsStore((state) => state.dapps);

  const [loaded, setLoaded] = useState<boolean>(false);

  React.useEffect(() => {
    if (nodes.length === 0) return;
    if (loaded) return;

    if (!categories || categories.length === 0 || dapps.length <= 2) return;

    const dappKey = searchParams.get('dapp');
    if (!dappKey) return;

    const dappIndex = dapps.findIndex((dapp) => dapp.key === dappKey);
    if (dappIndex === -1) return;

    setLoaded(true);
    addDappToNode(dappIndex);
  }, [categories, dapps, loaded, nodes.length]);
};

export default useSetDefaultDapp;
