import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import React from 'react';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { removeItemAtIndex } from '@/modules/blockchains/dapp/utils';

const useCheckEdges = () => {
  const edges = useFlowStore((state) => state.edges);
  const setEdges = useFlowStore((state) => state.setEdges);
  const removedNode = useFlowStore((state) => state.removedNode);
  const setRemovedNode = useFlowStore((state) => state.setRemovedNode);

  const checkEdges = () => {
    const indexEdgeRemoved = edges.findIndex(
      (edge) =>
        edge.target === removedNode?.id || edge.source === removedNode?.id,
    );
    console.log('indexEdgeRemoved', indexEdgeRemoved);
    if (indexEdgeRemoved === -1) return;

    setEdges(removeItemAtIndex(edges, indexEdgeRemoved));
    setRemovedNode(null);
    needReactFlowRenderSignal.value = true;
  };

  React.useEffect(() => {
    console.log('runmnnn here');
    if (removedNode === null) return;
    checkEdges();
  }, [removedNode]);
};

export default useCheckEdges;
