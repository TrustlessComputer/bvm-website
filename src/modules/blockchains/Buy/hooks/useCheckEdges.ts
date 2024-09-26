import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import React from 'react';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { removeItemAtIndex } from '@/modules/blockchains/dapp/utils';

const useCheckEdges = () => {
  const { edges, setEdges, removedNode, setRemovedNode } = useFlowStore();

  const checkEdges = () => {
    const indexEdgeRemoved = edges.findIndex(
      (edge) =>
        edge.target === removedNode?.id || edge.source === removedNode?.id,
    );

    if (indexEdgeRemoved === -1) return;

    setEdges(removeItemAtIndex(edges, indexEdgeRemoved));
    setRemovedNode(null);

    needReactFlowRenderSignal.value = true;
  };

  React.useEffect(() => {
    if (removedNode === null) return;
    checkEdges();
  }, [removedNode]);
};

export default useCheckEdges;
