import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import React from 'react';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { removeItemAtIndex } from '@/modules/blockchains/dapp/utils';

const useCheckEdges = () => {
  const { field } = useOrderFormStoreV3();
  const { nodes, setNodes, edges, setEdges, removedNode, setRemovedNode } = useFlowStore();

  const checkEdges = () => {
    const indexEdgeRemoved = edges.findIndex(edge => edge.target === removedNode?.id ||edge.source === removedNode?.id);
    console.log('indexEdgeRemoved', indexEdgeRemoved);
    if(indexEdgeRemoved === -1) return;


    setEdges(removeItemAtIndex(edges, indexEdgeRemoved));
    setRemovedNode(null)
    needReactFlowRenderSignal.value = true;
  };

  React.useEffect(() => {
    console.log('runmnnn here');
    if(removedNode === null) return;
    checkEdges();
  }, [removedNode]);

};

export default useCheckEdges;
