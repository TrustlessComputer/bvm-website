import CustomNode from '@/modules/blockchains/Buy/component4/CustomNode';
import { ReactFlow, useNodesState } from '@xyflow/react';
import React from 'react';
import useFlowStore from '../../stores/useFlowStore';
import ChainNode from '../../component4/CustomNode/ChainNode';

const ReactFlowRenderer = React.memo(() => {
  const { nodes, setNodes, onNodesChange } = useFlowStore();

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{ customBox: CustomNode, chainNode: ChainNode }}
      onNodesChange={onNodesChange}
      fitView
      fitViewOptions={{ padding: 2 }}
      nodeOrigin={[0.5, 0]}
    />
  );
});

export default ReactFlowRenderer;
