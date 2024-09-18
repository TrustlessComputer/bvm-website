import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import useFlowStore from '../stores/useFlowStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import useDapps from './useDapps';
import useNodeHelper from './useNodeHelper';
import { dappKeyToChainKey } from '../utils';
import { MarkerType } from '@xyflow/react';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';

const useSetDefaultDapp = () => {
  const searchParams = useSearchParams();
  const { categories } = useModelCategoriesStore();
  const { dapps } = useDapps();
  const { nodes } = useFlowStore();
  const { addDappToNode } = useNodeHelper();

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
