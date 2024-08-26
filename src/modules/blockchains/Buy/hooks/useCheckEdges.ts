import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useFlowStore from '@/modules/blockchains/Buy/stores/useFlowStore';
import React from 'react';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';

const useCheckEdges = () => {
  const { field } = useOrderFormStoreV3();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();

  const checkEdges = () => {
    const blockchainNodeIndex = nodes.findIndex(
      (node) => node.id === 'blockchain',
    );
    const blockchainNode = nodes[blockchainNodeIndex];

    if (!blockchainNode) return;

    const sourceHandles = blockchainNode.data.sourceHandles;
    const edgesData = edges.filter((edge) => edge.source === 'blockchain');

    const newSourceHandles = sourceHandles.filter((sourceHandle) => {
      const edgeIndex = edgesData.findIndex(
        (edge) => edge.sourceHandle === sourceHandle,
      );

      return edgeIndex !== -1;
    });

    blockchainNode.data.sourceHandles = newSourceHandles;

    setNodes([...nodes]);
    needReactFlowRenderSignal.value = true;
  };

  React.useEffect(() => {
    checkEdges();
  }, [nodes.length]);
};

export default useCheckEdges;
